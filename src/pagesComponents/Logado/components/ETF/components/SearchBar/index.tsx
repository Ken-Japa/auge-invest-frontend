import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { SearchBarContainer } from './styled';
import { ETFFilter } from '@/services/api/types/etf';

interface SearchBarProps {
  onSearch: (filters: ETFFilter) => void;
  onClear: () => void;
  initialFilters?: ETFFilter;
}

const industryOptions = [
  'Financeiro e Outros',
  'Materiais Básicos',
  'Bens Industriais',
  'Consumo Cíclico',
  'Consumo Não Cíclico',
  'Saúde',
  'Tecnologia da Informação',
  'Comunicações',
  'Utilidade Pública',
  'Petróleo, Gás e Biocombustíveis',
];

const segmentOptions = [
  'Fundos de Ações',
  'Fundos de Renda Fixa',
  'Fundos Multimercado',
  'Fundos Cambiais',
  'Fundos de Dívida Externa',
  'Fundos de Previdência',
  'Fundos de Investimento Imobiliário',
  'Fundos de Investimento em Participações',
  'Fundos de Investimento em Direitos Creditórios',
  'Fundos de Índice (ETFs)',
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear, initialFilters }) => {
  const [filters, setFilters] = useState<ETFFilter>(initialFilters || {});

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  return (
    <SearchBarContainer>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="nomeETF"
            label="Nome do ETF"
            variant="outlined"
            fullWidth
            value={filters.nomeETF || ''}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="codigoETF"
            label="Código do ETF"
            variant="outlined"
            fullWidth
            value={filters.codigoETF || ''}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="codigo"
            label="Código"
            variant="outlined"
            fullWidth
            value={filters.codigo || ''}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel>Indústria</InputLabel>
            <Select
              name="industria"
              value={filters.industria || ''}
              onChange={handleChange}
              label="Indústria"
            >
              <MenuItem value=""><em>Nenhum</em></MenuItem>
              {industryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel>Segmento</InputLabel>
            <Select
              name="segmento"
              value={filters.segmento || ''}
              onChange={handleChange}
              label="Segmento"
            >
              <MenuItem value=""><em>Nenhum</em></MenuItem>
              {segmentOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box display="flex" gap={1}>
            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
              Buscar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
              Limpar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </SearchBarContainer>
  );
};

export default SearchBar;