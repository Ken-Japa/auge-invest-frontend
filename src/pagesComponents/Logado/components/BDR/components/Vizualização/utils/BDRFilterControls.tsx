import React from 'react';
import {
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const FilterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .visualization-controls": {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    flexWrap: "wrap",
  },
}));
import { BDRType } from '../../types';

interface BDRFilterControlsProps {
  bdrType: BDRType;
  handleBDRTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BDRFilterControls: React.FC<BDRFilterControlsProps> = ({
  bdrType,
  handleBDRTypeChange,
}) => {
  return (
    <FilterContainer>
      <FormControl component="fieldset">
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
          Tipo de BDR
        </Typography>
        <RadioGroup
          row
          aria-label="tipo-bdr"
          name="tipo-bdr"
          value={bdrType}
          onChange={handleBDRTypeChange}
        >
          <FormControlLabel value="todos" control={<Radio />} label="Todos" />
          <FormControlLabel value="patrocinado" control={<Radio />} label="Patrocinados" />
          <FormControlLabel value="nao-patrocinado" control={<Radio />} label="Não Patrocinados" />
        </RadioGroup>
      </FormControl>
    </FilterContainer>
  );
};