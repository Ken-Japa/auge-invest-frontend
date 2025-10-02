import { formatCurrency } from '../../utils/currency'
import { IndustriaNode } from '../types'
import { adjustColorHSL, calculateNodeSize, calculatePosition } from '../utils/graphUtils'

export const createIndustriaNode = (
  industria: IndustriaNode,
  index: number,
  array: IndustriaNode[],
  maxValue: number,
  corIndustria: string,
  radius: number,
) => {
  const industriaAngle = (2 * Math.PI * index) / array.length
  const industriaSector = (2 * Math.PI) / array.length
  const position = calculatePosition(index, array.length, radius, industriaAngle, industriaSector)

  return {
    id: `industria-${industria.industria}`,
    label: `${industria.industria}\n${formatCurrency(industria.valorMercadoTotal)}`,
    x: position.x,
    y: position.y,
    size: calculateNodeSize(industria.valorMercadoTotal, 100, maxValue, 100 * 2.5, 100 * 5.5),
    font: { size: 160, bold: true },
    color: {
      background: corIndustria,
      border: adjustColorHSL(corIndustria, { l: -0.3 }),
      highlight: { background: corIndustria, border: '#FFFFFF' },
    },
    borderWidth: 2,
  }
}
