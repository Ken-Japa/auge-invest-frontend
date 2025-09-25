import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from "@mui/material/styles";

export type PeriodType = '1M' | '6M' | '1A' | '5A' | 'MAX';

interface PeriodSelectorProps {
  value: PeriodType;
  onChange: (period: PeriodType) => void;
}

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: '4px 10px',
  fontSize: '0.8rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  }
}));

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ value, onChange }) => {
  // Garantir que sempre temos um valor válido
  const safeValue = value || '5A';

  const handleChange = (_: React.MouseEvent<HTMLElement>, newPeriod: PeriodType | null) => {
    if (newPeriod) {
      onChange(newPeriod);
    }
  };

  return (
    <ToggleButtonGroup
      value={safeValue}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="período de tempo"
    >
      <StyledToggleButton value="1M">1M</StyledToggleButton>
      <StyledToggleButton value="6M">6M</StyledToggleButton>
      <StyledToggleButton value="1A">1A</StyledToggleButton>
      <StyledToggleButton value="5A">5A</StyledToggleButton>
      <StyledToggleButton value="MAX">MAX</StyledToggleButton>
    </ToggleButtonGroup>
  );
};