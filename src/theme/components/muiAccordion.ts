import { Components } from '@mui/material'

import { borderRadius, spacing, transitions } from '../variables'

/**
 * @const muiAccordion
 * @description Define as sobrescrições de estilo para o componente MuiAccordion.
 * Personaliza o raio da borda, sombra, borda, margens e transições do acordeão.
 */
export const muiAccordion: Components['MuiAccordion'] = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.md,
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
      '&:before': {
        display: 'none',
      },
      '&.Mui-expanded': {
        margin: 0,
        marginBottom: spacing.lg,
      },
      marginBottom: spacing.md,
      overflow: 'hidden',
      transition: transitions.medium,
    },
  },
}

/**
 * @const muiAccordionSummary
 * @description Define as sobrescrições de estilo para o componente MuiAccordionSummary.
 * Personaliza o preenchimento e as margens do conteúdo do resumo do acordeão.
 */
export const muiAccordionSummary: Components['MuiAccordionSummary'] = {
  styleOverrides: {
    root: {
      padding: `${spacing.sm} ${spacing.md}`,
      '& .MuiAccordionSummary-content': {
        margin: `${spacing.sm} 0`,
      },
    },
  },
}

/**
 * @const muiAccordionDetails
 * @description Define as sobrescrições de estilo para o componente MuiAccordionDetails.
 * Personaliza o preenchimento e a borda superior dos detalhes do acordeão.
 */
export const muiAccordionDetails: Components['MuiAccordionDetails'] = {
  styleOverrides: {
    root: {
      padding: spacing.md,
      borderTop: '1px solid',
      borderColor: 'divider',
    },
  },
}
