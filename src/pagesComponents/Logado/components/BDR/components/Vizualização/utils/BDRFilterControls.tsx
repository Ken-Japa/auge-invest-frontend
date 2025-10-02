import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

import { BDRFilterControlsProps } from '../../../types'
import { FilterContainer } from './styled'

export const BDRFilterControls: React.FC<BDRFilterControlsProps> = ({ bdrType, handleBDRTypeChange }) => {
  return (
    <FilterContainer>
      <FormControl component="fieldset">
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
          Tipo de BDR
        </Typography>
        <RadioGroup row aria-label="tipo-bdr" name="tipo-bdr" value={bdrType} onChange={handleBDRTypeChange}>
          <FormControlLabel value="todos" control={<Radio />} label="Todos" />
          <FormControlLabel value="patrocinado" control={<Radio />} label="Patrocinados" />
          <FormControlLabel value="nao-patrocinado" control={<Radio />} label="Não Patrocinados" />
        </RadioGroup>
      </FormControl>
    </FilterContainer>
  )
}
