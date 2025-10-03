import { formatCurrency } from '../../utils/currency'
import { EmpresaNode } from '../types'
import { adjustColorHSL, calculateNodeSize, calculatePosition } from '../utils/graphUtils'
import { Theme } from '@mui/material/styles'

export const createEmpresaNode = (
  empresa: EmpresaNode,
  empIndex: number,
  empArray: EmpresaNode[],
  maxValue: number,
  segmentColor: string,
  radius: number,
  segmentAngle: number,
  empresaSector: number,
  theme: Theme,
) => {
  const empresaAngle =
    segmentAngle - empresaSector * 0.4 + empresaSector * (empIndex / (empArray.length - 1 || 1))

  const position = calculatePosition(empIndex, empArray.length, radius, empresaAngle, empresaSector)

  const empresaColor = adjustColorHSL(segmentColor, {
    s: 0.1,
    l: -0.1,
  })

  let companyUrl = ''
  if (empresa.codigos && empresa.codigos.length > 0) {
    companyUrl = `/empresa/${empresa.codigos[0].codigo}`
  } else {
    companyUrl = `/empresa/${encodeURIComponent(empresa.empresa)}`
  }

  const nodeSize = calculateNodeSize(empresa.valorMercado, 10, maxValue, 10 * 0.8, 10 * 2.5)

  return {
    id: `empresa-${empresa.empresa}-${empIndex}`,
    label: `${empresa.empresa}\n${formatCurrency(empresa.valorMercado)}`,
    x: position.x,
    y: position.y,
    size: nodeSize,
    font: { size: Math.max(12, nodeSize / 5), bold: true, color: theme.palette.text.primary },
    color: {
      background: empresaColor,
      border: theme.palette.divider,
      highlight: { background: empresaColor, border: theme.palette.primary.main },
    },
    url: companyUrl,
    title: `Duplo clique para ver os detalhes de ${empresa.empresa} (${empresa.codigos?.[0]?.codigo || ''})`,
  }
}
