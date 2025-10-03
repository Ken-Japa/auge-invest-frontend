import { Theme } from '@mui/material/styles'

import { formatCurrency } from '../../utils/currency'
import { SegmentoNode } from '../types'
import { calculateNodeSize, calculatePosition } from '../utils/graphUtils'

export const createSegmentoNode = (
  segmento: SegmentoNode,
  segIndex: number,
  segArray: SegmentoNode[],
  maxValue: number,
  segmentColor: string,
  radius: number,
  industriaAngle: number,
  industriaSector: number,
  theme: Theme,
) => {
  const nodeSize = calculateNodeSize(segmento.valorMercado, 50, maxValue, 50 * 1.5, 50 * 4.0)
  const segmentSector = industriaSector
  const segmentAngle =
    industriaAngle - industriaSector * 0.2 + industriaSector * 0.8 * (segIndex / (segArray.length - 1 || 1))

  const position = calculatePosition(
    segIndex,
    segArray.length,
    radius,
    segmentAngle,
    segmentSector / segArray.length,
  )

  return {
    id: `segmento-${segmento.segmento}`,
    label: `${segmento.segmento}\n${formatCurrency(segmento.valorMercado)}`,
    x: position.x,
    y: position.y,
    size: nodeSize,
    font: { size: Math.max(12, nodeSize / 5), color: theme.palette.text.primary },
    color: {
      background: segmentColor,
      border: segmentColor,
      highlight: { background: segmentColor, border: theme.palette.primary.main },
    },
  }
}
