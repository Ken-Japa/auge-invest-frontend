import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchBarContainer } from './styled';
import { api } from '@/services/api';
import { ETFBDR } from '@/services/api/types/etfbdr';

interface SearchOption {
  label: string;
  value: string;
  type: 'nomeETF' | 'codigoETF';
  id: string;
}

interface ETFBDRSearchBarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (query: string) => void;
  onClear?: () => void;
}

export const SearchBar = ({ value, defaultValue = '', onChange, onClear }: ETFBDRSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(value || defaultValue);
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue);
  const router = useRouter();

  useEffect(() => {
    const loadETFBDRs = async () => {
      try {
        setLoading(true);
        const response = await api.etfbdr.getAllETFBDRs();

        const searchOptions: SearchOption[] = [];

        if (response && response.result && Array.isArray(response.result)) {
          response.result.forEach((etfbdr: ETFBDR) => {
            if (etfbdr.nomeETF) {
              searchOptions.push({
                label: `${etfbdr.nomeETF} (${etfbdr.codigoETF})`,
                value: etfbdr.nomeETF,
                type: 'nomeETF',
                id: etfbdr._id || ''
              });
            }
            if (etfbdr.codigoETF) {
              searchOptions.push({
                label: `${etfbdr.codigoETF} (${etfbdr.nomeETF})`,
                value: etfbdr.codigoETF,
                type: 'codigoETF',
                id: etfbdr._id || ''
              });
            }
          });
        }
        setOptions(searchOptions);
      } catch (error) {
        console.error('Erro ao carregar ETFBDRs:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadETFBDRs();
  }, []);

  const handleOptionSelect = (option: SearchOption | null) => {
    if (option) {
      router.push(`/etfbdr/${option.id}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setInputValue('');
    if (onChange) {
      onChange('');
    }
    if (onClear) {
      onClear();
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
            placeholder="Buscar ETFBDR ou código"
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
        }}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;