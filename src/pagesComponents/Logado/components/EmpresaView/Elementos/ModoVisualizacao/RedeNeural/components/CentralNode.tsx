import { formatCurrency } from '../../utils/currency';

export const createCentralNode = (valorTotal: number, sizeMultiplier: number = 10) => ({
  id: 'Mercado Total',
  label: `Mercado Total\n${formatCurrency(valorTotal)}`,
  x: 0,
  y: 0,
  size: 100 * sizeMultiplier,
  font: { size: 640, bold: true },
  color: {
    background: '#FFFFFF',
    border: '#000000',
    highlight: { background: '#FFFFFF', border: '#000000' }
  },
  borderWidth: 2
});