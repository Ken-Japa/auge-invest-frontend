import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

import { StatisticalData } from '../../utils/types'
import { calculateStatistics } from '../analiseService'

/**
 * Representa os dados e estatísticas para um período de análise específico.
 */
export interface PeriodData {
  label: string
  period: 'all' | '5y' | '2.5y' | 'custom'
  data: PriceDataPoint[]
  stats: StatisticalData | null
}

/**
 * Representa uma linha de desvio padrão para exibição em gráficos.
 */
export interface StdDevLine {
  label: string
  value: number
}

/**
 * Prepara os dados para cada período de análise
 * @param allHistoricalData - Todos os dados históricos disponíveis.
 * @param customYears - Número de anos para o período personalizado.
 * @returns Um array de objetos PeriodData, cada um contendo dados e estatísticas para um período específico.
 */
export const preparePeriodData = (allHistoricalData: PriceDataPoint[], customYears: number): PeriodData[] => {
  if (allHistoricalData.length === 0) return []

  const now = new Date()
  const fiveYearsAgo = new Date(now)
  fiveYearsAgo.setFullYear(now.getFullYear() - 5)

  const twoAndHalfYearsAgo = new Date(now)
  twoAndHalfYearsAgo.setFullYear(now.getFullYear() - 2)
  twoAndHalfYearsAgo.setMonth(now.getMonth() - 6)

  const customYearsAgo = new Date(now)
  customYearsAgo.setFullYear(now.getFullYear() - Math.floor(customYears))
  customYearsAgo.setMonth(now.getMonth() - Math.round((customYears % 1) * 12))

  // Filtrar dados para cada período
  const allData = [...allHistoricalData]
  const fiveYearData = allHistoricalData.filter((item) => new Date(item.data) >= fiveYearsAgo)
  const twoAndHalfYearData = allHistoricalData.filter((item) => new Date(item.data) >= twoAndHalfYearsAgo)
  const customYearData = allHistoricalData.filter((item) => new Date(item.data) >= customYearsAgo)

  // Calcular estatísticas para cada período
  return [
    {
      label: 'Todo o Histórico',
      period: 'all',
      data: allData,
      stats: calculateStatistics(allData),
    },
    {
      label: '5 Anos',
      period: '5y',
      data: fiveYearData,
      stats: calculateStatistics(fiveYearData),
    },
    {
      label: '2.5 Anos',
      period: '2.5y',
      data: twoAndHalfYearData,
      stats: calculateStatistics(twoAndHalfYearData),
    },
    {
      label: `Personalizável`,
      period: 'custom',
      data: customYearData,
      stats: calculateStatistics(customYearData),
    },
  ]
}

/**
 * Gera linhas de desvio padrão para o gráfico.
 * @param mean - A média dos valores.
 * @param stdDev - O desvio padrão dos valores.
 * @returns Um array de objetos StdDevLine, cada um representando uma linha de desvio padrão.
 */
export const generateStdDevLines = (mean: number, stdDev: number): StdDevLine[] => {
  return [
    { label: '-3σ', value: mean - 3 * stdDev },
    { label: '-2σ', value: mean - 2 * stdDev },
    { label: '-1σ', value: mean - 1 * stdDev },
    { label: 'Média', value: mean },
    { label: '+1σ', value: mean + 1 * stdDev },
    { label: '+2σ', value: mean + 2 * stdDev },
    { label: '+3σ', value: mean + 3 * stdDev },
  ]
}
