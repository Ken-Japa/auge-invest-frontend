/**
 * Utility functions for calculating financial metrics
 */

// Interface for historical price data point
import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

/**
 * Calculate the minimum price over the last 52 weeks
 * @param historicalData Array of price data points
 * @returns Minimum price in the last 52 weeks
 */
export const calculateMinimo52Semanas = (historicalData: PriceDataPoint[]): number => {
  if (!historicalData || historicalData.length === 0) return 0

  // Get date 52 weeks ago
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  // Filter data for last 52 weeks
  const last52WeeksData = historicalData.filter((item) => {
    const itemDate = new Date(item.data)
    return itemDate >= oneYearAgo
  })

  if (last52WeeksData.length === 0) return 0

  // Find minimum price
  return Math.min(...last52WeeksData.map((item) => item.valor))
}

/**
 * Calculate the maximum price over the last 52 weeks
 * @param historicalData Array of price data points
 * @returns Maximum price in the last 52 weeks
 */
export const calculateMaximo52Semanas = (historicalData: PriceDataPoint[]): number => {
  if (!historicalData || historicalData.length === 0) return 0

  // Get date 52 weeks ago
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  // Filter data for last 52 weeks
  const last52WeeksData = historicalData.filter((item) => {
    const itemDate = new Date(item.data)
    return itemDate >= oneYearAgo
  })

  if (last52WeeksData.length === 0) return 0

  // Find maximum price
  return Math.max(...last52WeeksData.map((item) => item.valor))
}

/**
 * Calculate the dividend yield
 * @param annualDividends Total dividends paid in the last 12 months
 * @param currentPrice Current stock price
 * @returns Dividend yield as a percentage
 */
export const calculateDividendYield = (annualDividends: number, currentPrice: number): number => {
  if (currentPrice <= 0) return 0
  return (annualDividends / currentPrice) * 100
}

/**
 * Calculate the 12-month price appreciation
 * @param historicalData Array of price data points
 * @returns 12-month appreciation as a percentage
 */
export const calculateValorizacao12M = (historicalData: PriceDataPoint[]): number => {
  if (!historicalData || historicalData.length < 2) return 0

  // Sort data by date (oldest to newest)
  const sortedData = [...historicalData].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
  )

  // Get current price (most recent data point)
  const currentPrice = sortedData[sortedData.length - 1].valor

  // Get date 12 months ago
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  // Find the closest data point to 12 months ago
  let closestIndex = 0
  let closestDiff = Infinity

  for (let i = 0; i < sortedData.length; i++) {
    const diff = Math.abs(new Date(sortedData[i].data).getTime() - oneYearAgo.getTime())
    if (diff < closestDiff) {
      closestDiff = diff
      closestIndex = i
    }
  }

  const priceOneYearAgo = sortedData[closestIndex].valor

  if (priceOneYearAgo <= 0) return 0

  // Calculate appreciation
  return ((currentPrice - priceOneYearAgo) / priceOneYearAgo) * 100
}

/**
 * Calculate all metrics at once
 * @param historicalData Array of price data points
 * @param annualDividends Total dividends paid in the last 12 months
 * @returns Object containing all calculated metrics
 */
export const calculateAllMetrics = (
  historicalData: PriceDataPoint[],
  annualDividends: number,
): {
  minimo52: number
  maximo52: number
  dividendYield: number
  valorizacao12m: number
} => {
  if (!historicalData || historicalData.length === 0) {
    return {
      minimo52: 0,
      maximo52: 0,
      dividendYield: 0,
      valorizacao12m: 0,
    }
  }

  // Get current price (most recent data point)
  const sortedData = [...historicalData].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
  )
  const currentPrice = sortedData[sortedData.length - 1].valor

  return {
    minimo52: calculateMinimo52Semanas(historicalData),
    maximo52: calculateMaximo52Semanas(historicalData),
    dividendYield: calculateDividendYield(annualDividends, currentPrice),
    valorizacao12m: calculateValorizacao12M(historicalData),
  }
}
