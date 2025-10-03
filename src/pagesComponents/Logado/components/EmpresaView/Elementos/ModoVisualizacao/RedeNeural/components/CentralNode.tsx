import { formatCurrency } from '../../utils/currency'
import { Theme } from '@mui/material/styles'

export const createCentralNode = (valorTotal: number, theme: Theme, sizeMultiplier = 10) => {
  return {
    id: 'Mercado Total',
    label: `Mercado Total\n${formatCurrency(valorTotal)}`,
    x: 0,
    y: 0,
    size: 100 * sizeMultiplier,
    font: { size: 64 * sizeMultiplier, bold: true, color: theme.palette.text.primary },
    color: {
      background: theme.palette.background.paper,
      border: theme.palette.divider,
      highlight: { background: theme.palette.background.default, border: theme.palette.primary.main },
    },
    borderWidth: 2,
  }
}
