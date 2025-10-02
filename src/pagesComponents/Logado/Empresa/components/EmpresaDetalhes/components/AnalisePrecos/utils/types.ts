// Importação de tipos externos
import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

// Tipos para dados estatísticos
/**
 * Representa os dados estatísticos calculados para um conjunto de pontos de preço.
 */
export interface StatisticalData {
  mean: number
  stdDev: number
  min: number
  max: number
  histogramData: HistogramBin[]
}

/**
 * Representa um bin (intervalo) no histograma.
 */
export interface HistogramBin {
  price: number
  frequency: number
  normalValue: number
}

/**
 * Define os períodos de análise disponíveis.
 */
export type AnalysisPeriod = 'all' | '5y' | '2.5y' | 'custom'

/**
 * Representa um alerta detalhado com preço, porcentagem e datas.
 */
export interface DetailedAlert {
  price: number
  percentage: number
  lastDate: Date | null
  daysSince: number | null
}

/**
 * Contém sugestões de alertas para diferentes níveis de preço.
 */
export interface AlertSuggestions {
  lowAlert90: DetailedAlert
  lowAlert80: DetailedAlert
  lowAlert70: DetailedAlert
  highAlert90: DetailedAlert
  highAlert80: DetailedAlert
  highAlert70: DetailedAlert
}

// Tipos para marcadores de gráfico
export interface ChartMarker {
  axis: 'x' | 'y'
  value: number | string
  lineStyle: { stroke: string; strokeWidth: number; strokeDasharray?: string }
  legend: string
  legendPosition: 'top' | 'bottom' | 'left' | 'right'
  legendOrientation?: 'horizontal' | 'vertical'
  textStyle: { fill: string }
}

// Tipos para pontos de dados em gráficos
export interface ChartDataPoint {
  x: string
  y: number
  showLabel?: boolean
  originalData: PriceDataPoint
}

export interface StdDevLine {
  label: string
  value: number
}

export interface AnalisePrecoProps {
  codigoAtivo: string
}
