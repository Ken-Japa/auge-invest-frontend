import { BoxAlign } from '@nivo/core'

import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

export interface ChartDataPoint {
  x: string
  y: number
  showLabel: boolean
  originalData: PriceDataPoint
}

export interface ChartMarker {
  axis: 'x' | 'y'
  value: string | number
  lineStyle: {
    stroke: string
    strokeWidth: number
    strokeDasharray: string
  }
  legend: string
  legendPosition: BoxAlign
  legendOrientation: 'horizontal' | 'vertical'
  textStyle: {
    fill: string
    fontSize: number
  }
}

export interface GraficoHistoricoAlertasProps {
  data: PriceDataPoint[]
  isLoading?: boolean
  isError?: string | null
  alertaCompra?: number | null
  alertaVenda?: number | null
}
