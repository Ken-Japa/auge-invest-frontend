import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

import { StatisticalData } from '../../utils/types'

/**
 * Calcula a média de um conjunto de dados de pontos de preço.
 * @param data - Array de pontos de preço.
 * @returns A média dos valores.
 */
export const calculateMean = (data: PriceDataPoint[]): number => {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, item) => acc + item.valor, 0)
  return sum / data.length
}

/**
 * Calcula o desvio padrão de um conjunto de dados de pontos de preço.
 * @param data - Array de pontos de preço.
 * @param mean - A média dos valores.
 * @returns O desvio padrão dos valores.
 */
export const calculateStdDev = (data: PriceDataPoint[], mean: number): number => {
  if (data.length <= 1) return 0
  const squaredDiffs = data.map((item) => Math.pow(item.valor - mean, 2))
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / (data.length - 1)
  return Math.sqrt(variance)
}

/**
 * Calcula o valor da distribuição normal para um dado ponto.
 * @param x - O valor para o qual calcular a distribuição normal.
 * @param mean - A média da distribuição.
 * @param stdDev - O desvio padrão da distribuição.
 * @returns O valor da função de densidade de probabilidade normal.
 */
export const calculateNormalValue = (x: number, mean: number, stdDev: number): number => {
  if (stdDev === 0) return 0
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent)
}

/**
 * Cria dados para um histograma a partir de pontos de preço.
 * @param data - Array de pontos de preço.
 * @param mean - A média dos valores.
 * @param stdDev - O desvio padrão dos valores.
 * @returns Dados formatados para um histograma.
 */
export const createHistogramData = (
  data: PriceDataPoint[],
  mean: number,
  stdDev: number,
): StatisticalData['histogramData'] => {
  if (data.length === 0 || stdDev === 0) return []

  const values = data.map((item) => item.valor)
  const min = Math.min(...values)
  const max = Math.max(...values)

  const binCount = 20
  const binSize = (max - min) / binCount
  const bins = Array.from({ length: binCount }, (_, i) => min + i * binSize)

  const frequencies = bins.map((binStart) => {
    const binEnd = binStart + binSize
    const count = values.filter((value) => value >= binStart && value < binEnd).length
    return {
      price: binStart + binSize / 2,
      frequency: count / data.length,
      normalValue: calculateNormalValue(binStart + binSize / 2, mean, stdDev),
    }
  })

  return frequencies
}
