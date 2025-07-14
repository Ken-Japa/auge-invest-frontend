import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchBarContainer } from './styled';
import { api } from '@/services/api';
import { ETF } from '@/services/api/types/etf';

interface SearchOption {
  label: string;
  value: string;
  type: 'nomeETF' | 'codigo';
  id: string;
}

interface ETFSearchBarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (query: string) => void;
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ value, defaultValue = '', onChange, onSearch }: ETFSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(value || defaultValue);
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue);
  const router = useRouter();

  useEffect(() => {
    if (value !== undefined && value !== searchQuery) {
      setSearchQuery(value);
      setInputValue(value);
    }
  }, [value, searchQuery]);

  useEffect(() => {
    const loadETFs = async () => {
      try {
        setLoading(true);
        const response = await api.etf.searchETFs('nomeETF'); // Fetch all ETFs initially

        const searchOptions: SearchOption[] = [];

        if (response && response.result && Array.isArray(response.result)) {
          response.result.forEach((etf: ETF) => {
            if (etf.nomeETF) {
              searchOptions.push({
                label: `${etf.nomeETF} (ETF)`,
                value: etf.nomeETF,
                type: 'nomeETF',
                id: etf._id || ''
              });
            }
            if (etf.codigo) {
              searchOptions.push({
                label: `${etf.codigo} (${etf.nomeETF})`,
                value: etf.codigo,
                type: 'codigo',
                id: etf._id || ''
              });
            }
          });
        }
        setOptions(searchOptions);
      } catch (error) {
        console.error('Erro ao carregar ETFs:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadETFs();
  }, []);

  const handleOptionSelect = (option: SearchOption | null) => {
    if (option) {
      router.push(`/etf/${option.id}`);
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
            placeholder="Buscar ETF ou código"
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

          if (onChange) {
            onChange(newInputValue);
          }

          if (onSearch) {
            if (newInputValue === '' || newInputValue.length >= 4) {
              clearTimeout((window as any).searchTimeout);
              (window as any).searchTimeout = setTimeout(() => {
                onSearch(newInputValue);
              }, 500);
            }
          }
        }}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;