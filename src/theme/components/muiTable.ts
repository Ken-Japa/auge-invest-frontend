import { Components } from '@mui/material'

/**
 * @const muiTable
 * @description Define as sobrescrições de estilo para o componente MuiTable.
 * Garante que as tabelas tenham um layout fixo para melhor controle de coluna.
 */
export const muiTable: Components['MuiTable'] = {
  styleOverrides: {
    root: {
      tableLayout: 'fixed',
    },
  },
}
