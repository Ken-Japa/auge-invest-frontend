import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

import { getHistoricalData } from '../../GraficoHistorico/services/historicalService'
import { StatisticalData } from '../utils/types'

import { calculateMean, calculateStdDev, createHistogramData } from './subservices/statisticsUtils'
export {
  calculateAlertSuggestions,
  calculatePricePercentage,
  findLastDateForPrice,
} from './subservices/alertUtils'
export { generateStdDevLines, preparePeriodData } from './subservices/dataPreparationUtils'

/**
 * Busca os dados históricos para um ativo específico
 */
export const fetchHistoricalData = async (codigoAtivo: string): Promise<PriceDataPoint[]> => {
  try {
    // Buscar todos os dados históricos disponíveis
    const data = await getHistoricalData(codigoAtivo, 'MAX')

    if (!data || data.length === 0) {
      throw new Error(`Nenhum dado histórico encontrado para ${codigoAtivo}`)
    }

    // Ordenar dados por data (mais antigo para mais recente)
    return [...data].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error)
    throw error
  }
}

/**
 * Calcula estatísticas para um conjunto de dados de pontos de preço.
 * @param data - Array de pontos de preço.
 * @returns Um objeto StatisticalData contendo média, desvio padrão, mínimo, máximo e dados do histograma, ou null se os dados estiverem vazios.
 */
export const calculateStatistics = (data: PriceDataPoint[]): StatisticalData | null => {
  if (!data || data.length === 0) return null

  const mean = calculateMean(data)
  const stdDev = calculateStdDev(data, mean)
  const values = data.map((item) => item.valor)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const histogramData = createHistogramData(data, mean, stdDev)

  return { mean, stdDev, min, max, histogramData }
}
