import { Components } from '@mui/material'

import { borderRadius, spacing, transitions } from '../variables'

/**
 * @const muiButton
 * @description Define as sobrescrições de estilo para o componente MuiButton.
 * Personaliza o preenchimento, raio da borda, transformação de texto e transições para botões.
 * Inclui estilos específicos para variantes 'contained' e 'outlined'.
 */
export const muiButton: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      padding: `${spacing.xs} ${spacing.md}`,
      borderRadius: borderRadius.sm,
      textTransform: 'capitalize',
      transition: transitions.medium,
    },
    contained: {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    outlined: {
      borderWidth: '1px',
      '&:hover': {
        borderWidth: '1px',
      },
    },
  },
}
