import { Grid, Switch } from '@mui/material'
import React from 'react'

import { StyledFormControlLabel, StyledTextField } from './styled'

interface AlertTimingFieldsProps {
  formData: {
    expiresAt: string
    recurring: boolean
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Componente para os campos de temporização do formulário de alerta.
 * Inclui "Expira em" e "Recorrente".
 * @param {AlertTimingFieldsProps} props - As props do componente.
 */
export const AlertTimingFields: React.FC<AlertTimingFieldsProps> = ({ formData, handleChange }) => {
  return (
    <>
      <Grid item xs={12} display="flex" justifyContent="center">
        <StyledTextField
          label="Expira em (opcional)"
          name="expirationDate"
          type="date"
          value={formData.expiresAt}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          textAlign="right"
        />
      </Grid>
      <Grid item xs={12}>
        <StyledFormControlLabel
          control={<Switch checked={formData.recurring} onChange={handleChange} name="recurring" />}
          label={formData.recurring ? 'Recorrente' : 'Não recorrente'}
        />
      </Grid>
    </>
  )
}
