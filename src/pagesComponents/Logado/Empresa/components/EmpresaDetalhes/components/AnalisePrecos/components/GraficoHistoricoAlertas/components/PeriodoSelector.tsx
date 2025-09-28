import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

import { AnalysisPeriod } from '../../../utils/types';

interface PeriodoSelectorProps {
  selectedPeriod: AnalysisPeriod;
  onPeriodChange: (event: SelectChangeEvent) => void;
}

const PeriodoSelector: React.FC<PeriodoSelectorProps> = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="periodo-select-label">Período</InputLabel>
      <Select
        labelId="periodo-select-label"
        id="periodo-select"
        value={selectedPeriod}
        onChange={onPeriodChange}
        label="Período"
      >
        <MenuItem value="all">Todo o Histórico</MenuItem>
        <MenuItem value="5y">5 Anos</MenuItem>
        <MenuItem value="2.5y">2.5 Anos</MenuItem>
        <MenuItem value="custom">Personalizado</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PeriodoSelector;