import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContainer } from './styled';

import { sumarioService } from '../ModoVisualizacao/utils/sumarioService';

interface SearchOption {
    label: string;
    value: string;
    type: 'empresa' | 'codigo';
}

interface SearchBarProps {
    defaultValue?: string;
}

export const SearchBar = ({ defaultValue = '' }: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState(defaultValue);
    const [options, setOptions] = useState<SearchOption[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                setLoading(true);
                const { sumario } = await sumarioService.getSumarioData();

                // Extract all companies and their codes
                const searchOptions: SearchOption[] = [];

                sumario.forEach(industria => {
                    industria.segmentos.forEach(segmento => {
                        segmento.empresasDetalhes.forEach(empresa => {
                            // Check if codigos exists and has items
                            if (empresa.codigos && empresa.codigos.length > 0) {
                                // Add company name as an option
                                searchOptions.push({
                                    label: `${empresa.empresa} (Empresa)`,
                                    value: empresa.codigos[0].codigo,
                                    type: 'empresa'
                                });

                                // Add each code as an option
                                empresa.codigos.forEach(codigo => {
                                    searchOptions.push({
                                        label: `${codigo.codigo} (${empresa.empresa})`,
                                        value: codigo.codigo,
                                        type: 'codigo'
                                    });
                                });
                            }
                        });
                    });
                });

                setOptions(searchOptions);
            } catch (error) {
                console.error('Error loading companies:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCompanies();
    }, []);

    const handleOptionSelect = (option: SearchOption | null) => {
        if (option) {
            router.push(`/empresa/${option.value}`);
        }
    };

    return (
        <SearchContainer>
            <Autocomplete
                freeSolo
                options={options}
                loading={loading}
                filterOptions={(options, { inputValue }) => {
                    const inputLower = inputValue.toLowerCase();
                    if (inputLower.length < 3) {
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
                        placeholder="Buscar empresa ou código"
                        InputProps={{
                            ...params.InputProps,
                            style: {
                                minWidth: '250px',
                                padding: '2px 8px'
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon color="action" />
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
                    setSearchQuery(newInputValue);
                }}
            />
        </SearchContainer>
    );
};