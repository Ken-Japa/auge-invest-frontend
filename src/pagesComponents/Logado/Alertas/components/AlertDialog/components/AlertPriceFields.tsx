import { Grid, InputAdornment, TextField } from '@mui/material'
import React from 'react'

interface AlertPriceFieldsProps {
  formData: {
    targetPrice: number
    currentPrice: number
    percentageDistance: number
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Componente para os campos de preço do formulário de alerta.
 * Inclui Preço Alvo, Preço Atual e Distância Percentual.
 * @param {AlertPriceFieldsProps} props - As props do componente.
 */
export const AlertPriceFields: React.FC<AlertPriceFieldsProps> = ({ formData, handleChange }) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Preço Alvo"
          name="targetPrice"
          type="number"
          value={formData.targetPrice}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Preço Atual"
          name="currentPrice"
          type="number"
          value={formData.currentPrice}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Distância Percentual"
          name="percentageDistance"
          type="number"
          value={formData.percentageDistance}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>
    </>
  )
}
