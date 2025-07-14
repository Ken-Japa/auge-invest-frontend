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
    type: 'bdr' | 'bdr-np' | 'codigo';
    id: string;
}

interface BDRSearchBarProps {
    value?: string;
    defaultValue?: string;
    onChange?: (query: string) => void;
    onSearch?: (query: string) => void;
}

export const BDRSearchBar = ({ value, defaultValue = '', onChange, onSearch }: BDRSearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState(value || defaultValue);
    const [options, setOptions] = useState<SearchOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState(value || defaultValue);
    const router = useRouter();

    // Atualiza o estado interno quando o valor externo muda
    useEffect(() => {
        if (value !== undefined && value !== searchQuery) {
            setSearchQuery(value);
            setInputValue(value);
        }
    }, [value, searchQuery]);

    useEffect(() => {
        const loadBDRs = async () => {
            try {
                setLoading(true);

                // Get all BDRs (both sponsored and non-sponsored)
                const [sponsoredResponse, nonSponsoredResponse] = await Promise.all([
                    api.bdrs.searchBDRs('', 'nomeEmpresa'),
                    api.bdrnp.searchBDRNPs('', 'nomeEmpresa')
                ]);

                // Extract all BDRs and their codes
                const searchOptions: SearchOption[] = [];

                // Process sponsored BDRs
                if (sponsoredResponse && sponsoredResponse.result && Array.isArray(sponsoredResponse.result)) {
                    sponsoredResponse.result.forEach((bdr: any) => {
                        if (bdr.nomeEmpresa) {
                            searchOptions.push({
                                label: `${bdr.nomeEmpresa} (BDR)`,
                                value: bdr.nomeEmpresa,
                                type: 'bdr',
                                id: bdr._id || ''
                            });

                            // Add code as an option
                            if (bdr.codigo) {
                                searchOptions.push({
                                    label: `${bdr.codigo} (${bdr.nomeEmpresa})`,
                                    value: bdr.codigo,
                                    type: 'codigo',
                                    id: bdr._id || ''
                                });
                            }
                        }
                    });
                }

                // Process non-sponsored BDRs
                if (nonSponsoredResponse && nonSponsoredResponse.result && Array.isArray(nonSponsoredResponse.result)) {
                    nonSponsoredResponse.result.forEach((bdr: any) => {
                        if (bdr.nomeEmpresa) {
                            searchOptions.push({
                                label: `${bdr.nomeEmpresa} (BDR Não Patrocinado)`,
                                value: bdr.nomeEmpresa,
                                type: 'bdr-np',
                                id: bdr._id || ''
                            });

                            // Add code as an option
                            if (bdr.codigo) {
                                searchOptions.push({
                                    label: `${bdr.codigo} (${bdr.nomeEmpresa})`,
                                    value: bdr.codigo,
                                    type: 'codigo',
                                    id: bdr._id || ''
                                });
                            }
                        }
                    });
                }

                setOptions(searchOptions);
            } catch (error) {
                console.error('Erro ao carregar BDRs:', error);
                // Set empty options instead of failing
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        loadBDRs();
    }, []);

    const handleOptionSelect = (option: SearchOption | null) => {
        if (option) {
            router.push(`/bdr/${option.id}`);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setInputValue('');
        if (onChange) {
            onChange('');
        }
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
                    // Only show suggestions when user types at least 2 characters
                    if (inputLower.length < 2) {
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
                        placeholder="Buscar BDR ou código"
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

                    // Notifica sobre a mudança imediatamente
                    if (onChange) {
                        onChange(newInputValue);
                    }

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

export default BDRSearchBar;