import { Components } from '@mui/material'

import { borderRadius, shadows } from '../variables'

/**
 * @const muiPaper
 * @description Define as sobrescrições de estilo para o componente MuiPaper.
 * Remove a imagem de fundo padrão e aplica raio de borda e sombra personalizados.
 */
export const muiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: {
      backgroundImage: 'none',
      borderRadius: borderRadius.md,
      boxShadow: shadows.sm,
    },
  },
}
