import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { api } from '@/services/api';
import { SearchContainer } from './styled';

interface SearchOption {
    label: string;
    value: string;
    type: 'fii' | 'codigo';
    id: string;
}

interface FIISearchBarProps {
    defaultValue?: string;
    onSearch?: (query: string) => void;
}

export const FIISearchBar = ({ defaultValue = '', onSearch }: FIISearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState(defaultValue);
    const [options, setOptions] = useState<SearchOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    useEffect(() => {
        const loadFIIs = async () => {
            try {
                setLoading(true);

                // Get all FIIs (with a reasonable limit)
                const response = await api.fiis.getFIIs({ pageSize: 100 });

                // Extract all FIIs and their codes
                const searchOptions: SearchOption[] = [];

                // Updated to match the new API response structure
                if (response && response.result && Array.isArray(response.result)) {
                    response.result.forEach((fii: any) => {
                        // Only add if nomeFII exists
                        if (fii.nomeFII) {
                            // Add FII name as an option
                            searchOptions.push({
                                label: `${fii.nomeFII} (FII)`,
                                value: fii.nomeFII,
                                type: 'fii',
                                id: fii._id || ''
                            });

                            // Add each code as an option
                            if (fii.codigo && Array.isArray(fii.codigo) && fii.codigo.length > 0) {
                                fii.codigo.forEach((codigo: string) => {
                                    searchOptions.push({
                                        label: `${codigo} (${fii.nomeFII})`,
                                        value: codigo,
                                        type: 'codigo',
                                        id: fii._id || ''
                                    });
                                });
                            }
                        }
                    });
                }

                setOptions(searchOptions);
            } catch (error) {
                console.error('Erro ao carregar FIIs:', error);
                // Set empty options instead of failing
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        loadFIIs();
    }, []);

    const handleOptionSelect = (option: SearchOption | null) => {
        if (option) {
            router.push(`/fii/${option.id}`);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setInputValue('');
        if (onSearch) {
            onSearch('');
        }
    };



    return (
        <SearchContainer>
            <Autocomplete
                freeSolo
                options={options}
                loading={loading}
                inputValue={inputValue}
                filterOptions={(options, { inputValue }) => {
                    const inputLower = inputValue.toLowerCase();
                    // Only show suggestions when user types at least 4 characters
                    if (inputLower.length < 4) {
                        return [];
                    }
                    return options.filter(option =>
                        option.label.toLowerCase().includes(inputLower)
                    );
                }}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    return option.label;
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        placeholder="Buscar FII ou código"
                        InputProps={{
                            ...params.InputProps,
                            style: {
                                minWidth: '250px',
                                padding: '2px 8px'
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    {inputValue ? (
                                        <IconButton
                                            aria-label="clear search"
                                            onClick={handleClearSearch}
                                            edge="end"
                                            size="small"
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    ) : (
                                        <SearchIcon color="action" />
                                    )}
                                </InputAdornment>
                            )
                        }}
                    />
                )}
                onChange={(_, newValue) => {
                    if (newValue && typeof newValue !== 'string') {
                        handleOptionSelect(newValue);
                    }
                }}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                    setSearchQuery(newInputValue);

                    // Debounce the search to prevent too many API calls
                    if (onSearch) {
                        // Only search if empty (to reset) or has at least 4 characters
                        if (newInputValue === '' || newInputValue.length >= 4) {
                            // Add a small delay to prevent rapid API calls while typing
                            clearTimeout((window as any).searchTimeout);
                            (window as any).searchTimeout = setTimeout(() => {
                                onSearch(newInputValue);
                            }, 500);
                        }
                    }
                }}
            />
        </SearchContainer>
    );
};

export default FIISearchBar;