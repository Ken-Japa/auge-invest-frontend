import { FormControlLabel, Grid, Switch, TextField } from '@mui/material'
import React from 'react'

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
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Expira em (opcional)"
          name="expiresAt"
          type="date"
          value={formData.expiresAt}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Switch checked={formData.recurring} onChange={handleChange} name="recurring" />}
          label="Recorrente"
        />
      </Grid>
    </>
  )
}
