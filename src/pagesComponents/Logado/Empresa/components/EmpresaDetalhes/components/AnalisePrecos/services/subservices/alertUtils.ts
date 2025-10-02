import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

import { AlertSuggestions } from '../../utils/types'

/**
 * Calcula a porcentagem de preços acima ou abaixo de um determinado valor.
 * @param data - Array de pontos de preço.
 * @param targetPrice - Preço alvo para comparação.
 * @param isAbove - Se true, conta preços acima do alvo; se false, conta preços abaixo.
 * @returns A porcentagem de preços que atendem ao critério.
 */
export const calculatePricePercentage = (
  data: PriceDataPoint[],
  targetPrice: number,
  isAbove: boolean,
): number => {
  if (!data || data.length === 0) return 0

  const totalPrices = data.length
  const count = data.filter((item) => (isAbove ? item.valor > targetPrice : item.valor < targetPrice)).length

  return (count / totalPrices) * 100
}

/**
 * Encontra a última data em que um preço específico foi atingido ou ultrapassado.
 * @param data - Array de pontos de preço.
 * @param targetPrice - Preço alvo para comparação.
 * @param isAbove - Se true, busca a última data em que o preço foi maior ou igual ao alvo; se false, menor ou igual.
 * @returns Um objeto contendo a última data encontrada e o número de dias desde então, ou null se não houver correspondência.
 */
export const findLastDateForPrice = (
  data: PriceDataPoint[],
  targetPrice: number,
  isAbove: boolean,
): { date: Date | null; daysSince: number | null } => {
  if (!data || data.length === 0) return { date: null, daysSince: null }

  // Ordenar dados por data (mais recente para mais antigo)
  const sortedData = [...data].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())

  // Encontrar o último ponto de dados que atende ao critério
  const lastMatch = sortedData.find((item) =>
    isAbove ? item.valor >= targetPrice : item.valor <= targetPrice,
  )

  if (!lastMatch) return { date: null, daysSince: null }

  const lastDate = new Date(lastMatch.data)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - lastDate.getTime())
  const daysSince = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return { date: lastDate, daysSince }
}

/**
 * Calcula sugestões de alertas com base nas estatísticas.
 * @param mean - A média dos valores.
 * @param stdDev - O desvio padrão dos valores.
 * @param data - Array de pontos de preço.
 * @returns Um objeto AlertSuggestions contendo sugestões de alertas detalhadas.
 */
export const calculateAlertSuggestions = (
  mean: number,
  stdDev: number,
  data: PriceDataPoint[],
): AlertSuggestions => {
  // Ordenar os preços do menor para o maior
  const sortedPrices = data.map((item) => item.valor).sort((a, b) => a - b)

  // Calcular os índices para os percentis desejados
  const lowAlert90Idx = Math.floor(sortedPrices.length * 0.1) // 90% acima
  const lowAlert80Idx = Math.floor(sortedPrices.length * 0.2) // 80% acima
  const lowAlert70Idx = Math.floor(sortedPrices.length * 0.3) // 70% acima
  const highAlert90Idx = Math.floor(sortedPrices.length * 0.9) // 90% abaixo
  const highAlert80Idx = Math.floor(sortedPrices.length * 0.8) // 80% abaixo
  const highAlert70Idx = Math.floor(sortedPrices.length * 0.7) // 70% abaixo

  // Obter os preços nos índices calculados
  const lowAlert90 = sortedPrices[lowAlert90Idx]
  const lowAlert80 = sortedPrices[lowAlert80Idx]
  const lowAlert70 = sortedPrices[lowAlert70Idx]
  const highAlert90 = sortedPrices[highAlert90Idx]
  const highAlert80 = sortedPrices[highAlert80Idx]
  const highAlert70 = sortedPrices[highAlert70Idx]

  // Calcular porcentagens exatas
  const lowPercentage90 = calculatePricePercentage(data, lowAlert90, true)
  const lowPercentage80 = calculatePricePercentage(data, lowAlert80, true)
  const lowPercentage70 = calculatePricePercentage(data, lowAlert70, true)
  const highPercentage90 = calculatePricePercentage(data, highAlert90, false)
  const highPercentage80 = calculatePricePercentage(data, highAlert80, false)
  const highPercentage70 = calculatePricePercentage(data, highAlert70, false)

  // Encontrar as últimas datas
  const lowLastDate90 = findLastDateForPrice(data, lowAlert90, false)
  const lowLastDate80 = findLastDateForPrice(data, lowAlert80, false)
  const lowLastDate70 = findLastDateForPrice(data, lowAlert70, false)
  const highLastDate90 = findLastDateForPrice(data, highAlert90, true)
  const highLastDate80 = findLastDateForPrice(data, highAlert80, true)
  const highLastDate70 = findLastDateForPrice(data, highAlert70, true)
  const result: AlertSuggestions = {
    lowAlert90: {
      price: lowAlert90,
      percentage: lowPercentage90,
      lastDate: lowLastDate90.date,
      daysSince: lowLastDate90.daysSince,
    },
    lowAlert80: {
      price: lowAlert80,
      percentage: lowPercentage80,
      lastDate: lowLastDate80.date,
      daysSince: lowLastDate80.daysSince,
    },
    lowAlert70: {
      price: lowAlert70,
      percentage: lowPercentage70,
      lastDate: lowLastDate70.date,
      daysSince: lowLastDate70.daysSince,
    },
    highAlert90: {
      price: highAlert90,
      percentage: highPercentage90,
      lastDate: highLastDate90.date,
      daysSince: highLastDate90.daysSince,
    },
    highAlert80: {
      price: highAlert80,
      percentage: highPercentage80,
      lastDate: highLastDate80.date,
      daysSince: highLastDate80.daysSince,
    },
    highAlert70: {
      price: highAlert70,
      percentage: highPercentage70,
      lastDate: highLastDate70.date,
      daysSince: highLastDate70.daysSince,
    },
  }

  return result
}
