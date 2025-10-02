import { Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

import { PeriodData } from '../../services/subservices/dataPreparationUtils'

type AnalysisPeriod = PeriodData['period']

import {
  CustomYearsContainer,
  CustomYearsSlider,
  PeriodoContainer,
  PeriodoFormControl,
  YearsTypography,
} from './styled'

interface PeriodoProps {
  periodsData: PeriodData[]
  selectedPeriod: AnalysisPeriod | null
  customYears: number
  onPeriodChange: (event: SelectChangeEvent) => void
  onCustomYearsChange: (event: Event, newValue: number | number[]) => void
}

const Periodo: React.FC<PeriodoProps> = ({
  periodsData,
  selectedPeriod,
  customYears,
  onPeriodChange,
  onCustomYearsChange,
}) => {
  return (
    <PeriodoContainer container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <PeriodoFormControl>
          <InputLabel>Período de Análise</InputLabel>
          <Select value={selectedPeriod || ''} label="Período de Análise" onChange={onPeriodChange}>
            {periodsData.map((period) => (
              <MenuItem key={period.period} value={period.period}>
                {period.label}
              </MenuItem>
            ))}
          </Select>
        </PeriodoFormControl>
      </Grid>
      {selectedPeriod === 'custom' && (
        <Grid item xs={12} md={6}>
          <CustomYearsContainer>
            <YearsTypography gutterBottom>Período Escolhido - {customYears} Anos</YearsTypography>
            <CustomYearsSlider
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
          </CustomYearsContainer>
        </Grid>
      )}
    </PeriodoContainer>
  )
}

export default Periodo
