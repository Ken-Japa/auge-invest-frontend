import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import React from 'react'

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
      <FormLabel component="legend">Tipo de Alerta</FormLabel>
      <RadioGroup row name="type" value={type} onChange={handleChange}>
        <FormControlLabel value="buy" control={<Radio />} label="Compra" />
        <FormControlLabel value="sell" control={<Radio />} label="Venda" />
      </RadioGroup>
    </Grid>
  )
}
