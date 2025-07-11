import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, Slider, SelectChangeEvent } from '@mui/material';
import { AnalysisPeriod, PeriodData } from '../../services/analiseService';

interface PeriodoProps {
  selectedPeriod: AnalysisPeriod;
  customYears: number;
  periodsData: PeriodData[];
  onPeriodChange: (event: SelectChangeEvent) => void;
  onCustomYearsChange: (event: Event, value: number | number[]) => void;
}

const Periodo: React.FC<PeriodoProps> = ({
  selectedPeriod,
  customYears,
  periodsData,
  onPeriodChange,
  onCustomYearsChange
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Período de Análise</InputLabel>
          <Select
            value={selectedPeriod}
            label="Período de Análise"
            onChange={onPeriodChange}
          >
            {periodsData.map((period) => (
              <MenuItem key={period.period} value={period.period}>
                {period.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {selectedPeriod === 'custom' && (
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Período Escolhido - {customYears} Anos </Typography>
          <Slider
            value={customYears}
            onChange={onCustomYearsChange}
            min={0.5}
            max={10}
            step={0.5}
            marks={[
              { value: 0.5, label: '0.5' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} anos`}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Periodo;