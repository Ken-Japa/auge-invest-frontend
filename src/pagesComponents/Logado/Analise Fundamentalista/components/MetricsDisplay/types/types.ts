export type MetricType = 'currency' | 'percentage' | 'ratio' | 'number'

export interface MetricCardProps {
  title: string
  value: number
  formula?: string
  description?: string
  missingFields?: string[]
  type: MetricType
  isInvalid?: boolean
  metricKey: string
}

export interface MetricCategory {
  title: string
  metrics: {
    title: string
    value: number
    formula: string
    description: string
    missingFields: string[]
    type: MetricType
    metricKey: string
  }[]
}
