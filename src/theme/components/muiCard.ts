import { Components } from '@mui/material'

import { borderRadius, shadows } from '../variables'

/**
 * @const muiCard
 * @description Define as sobrescrições de estilo para o componente MuiCard.
 * Personaliza o raio da borda, sombra e comportamento de overflow para cards.
 */
export const muiCard: Components['MuiCard'] = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.md,
      boxShadow: shadows.sm,
      overflow: 'hidden',
    },
  },
}
