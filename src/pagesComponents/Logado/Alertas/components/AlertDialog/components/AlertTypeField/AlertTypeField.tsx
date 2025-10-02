import { FormControlLabel, Grid, Radio } from '@mui/material'
import React from 'react'

import { StyledRadioGroup } from './styled'

interface AlertTypeFieldProps {
  type: 'buy' | 'sell'
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Componente para seleção do tipo de alerta (compra/venda).
 * @param {AlertTypeFieldProps} props - As props do componente.
 */
export const AlertTypeField: React.FC<AlertTypeFieldProps> = ({ type, handleChange }) => {
  return (
    <Grid item xs={12}>
      <StyledRadioGroup row name="type" value={type} onChange={handleChange}>
        <FormControlLabel value="buy" control={<Radio />} label="Compra" />
        <FormControlLabel value="sell" control={<Radio />} label="Venda" />
      </StyledRadioGroup>
    </Grid>
  )
}
