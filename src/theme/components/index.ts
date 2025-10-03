import { Components } from '@mui/material'

import { muiAccordion, muiAccordionDetails, muiAccordionSummary } from './muiAccordion'
import { muiButton } from './muiButton'
import { muiCard } from './muiCard'
import { muiPaper } from './muiPaper'
import { muiTable } from './muiTable'

/**
 * @const components
 * @description Objeto que define as sobrescrições de componentes Material-UI para personalizar a aparência e o comportamento.
 * Inclui configurações para botões, tabelas, papéis, cards, acordeões e o CssBaseline para estilos globais.
 */
export const components: Components = {
  MuiButton: muiButton,
  MuiTable: muiTable,
  MuiPaper: muiPaper,
  MuiCard: muiCard,
  MuiAccordion: muiAccordion,
  MuiAccordionSummary: muiAccordionSummary,
  MuiAccordionDetails: muiAccordionDetails,
  /**
   * @property MuiCssBaseline
   * @description Sobrescrições de estilo para o componente MuiCssBaseline, aplicando estilos globais ao corpo do documento.
   * Inclui a personalização da barra de rolagem para uma aparência mais consistente entre navegadores.
   */
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(128, 128, 128, 0.5)',
          borderRadius: '4px',
        },
      },
    },
  },
}
