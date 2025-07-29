"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchBarContainer } from './styled';
import { SearchOption } from './search';

interface SearchBarProps {
    placeholder?: string;
    fetchOptions: () => Promise<SearchOption[]>;
    onSearch: (option: SearchOption | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Buscar...',
    fetchOptions,
    onSearch,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState<SearchOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const loadOptions = async () => {
            setLoading(true);
            const fetchedOptions = await fetchOptions();
            setOptions(fetchedOptions);
            setLoading(false);
        };
        loadOptions();
    }, [fetchOptions]);

    const handleClearSearch = () => {
        setSearchQuery('');
        setInputValue('');
        onSearch(null);
    };

    return (
        <SearchBarContainer>
            <Autocomplete
                freeSolo
                options={options}
                loading={loading}
                inputValue={inputValue}
                filterOptions={(options, { inputValue }) => {
                    const inputLower = inputValue.toLowerCase();
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
                        placeholder={placeholder}
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
                        onSearch(newValue);
                    }
                    else {
                        onSearch(null);
                    }
                }}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                    setSearchQuery(newInputValue);
                }}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;