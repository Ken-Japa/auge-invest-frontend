import { Grid, TextField } from '@mui/material'
import React from 'react'

interface AlertCommentsFieldProps {
  comments: string
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

/**
 * Componente para o campo de comentários do formulário de alerta.
 * @param {AlertCommentsFieldProps} props - As props do componente.
 */
export const AlertCommentsField: React.FC<AlertCommentsFieldProps> = ({ comments, handleChange }) => {
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Comentários (opcional)"
        name="comments"
        multiline
        rows={4}
        value={comments}
        onChange={handleChange}
      />
    </Grid>
  )
}
