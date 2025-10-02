import { PeriodType } from '../components/PeriodSelector'

export const filterDataByPeriod = (data: any[], period: PeriodType) => {
  if (!data || data.length === 0) {
    return []
  }

  const today = new Date()
  const startDate = new Date()

  switch (period) {
    case '1M':
      startDate.setMonth(today.getMonth() - 1)
      break
    case '6M':
      startDate.setMonth(today.getMonth() - 6)
      break
    case '1A':
      startDate.setFullYear(today.getFullYear() - 1)
      break
    case '5A':
      startDate.setFullYear(today.getFullYear() - 5)
      break
    case 'MAX':
      return data
    default:
      startDate.setFullYear(today.getFullYear() - 1)
  }

  const filteredData = data.filter((item) => {
    try {
      const itemDate = new Date(item.data)
      return itemDate >= startDate
    } catch (e) {
      return false
    }
  })

  // Garantir que os dados estão ordenados por data
  return filteredData.sort((a, b) => {
    const dateA = new Date(a.data).getTime()
    const dateB = new Date(b.data).getTime()
    return dateA - dateB
  })
}

// Função para otimizar a quantidade de pontos no gráfico
export const getOptimalDataInterval = (data: any[], period: PeriodType) => {
  if (!data || data.length === 0) return []

  // Se temos poucos pontos, retornamos todos
  if (data.length <= 100) return data

  // Determinamos o intervalo ideal com base no período
  let interval = 1

  switch (period) {
    case '1M':
      // Para 1 mês, mostramos todos os pontos
      return data
    case '6M':
      // Para 6 meses, reduzimos se tivermos muitos pontos
      interval = Math.max(1, Math.floor(data.length / 120))
      break
    case '1A':
      // Para 1 ano, reduzimos mais
      interval = Math.max(1, Math.floor(data.length / 100))
      break
    case '5A':
      // Para 5 anos, reduzimos significativamente
      interval = Math.max(1, Math.floor(data.length / 50))
      break
    case 'MAX':
      // Para máximo, reduzimos ainda mais
      interval = Math.max(1, Math.floor(data.length / 40))
      break
  }

  // Sempre incluímos o primeiro e o último ponto
  const result = [data[0]]

  // Adicionamos pontos no intervalo calculado
  for (let i = interval; i < data.length - 1; i += interval) {
    result.push(data[i])
  }

  // Adicionamos o último ponto
  if (data.length > 1) {
    result.push(data[data.length - 1])
  }

  return result
}

// Nova função para gerar apenas os labels otimizados para o eixo X
export const getOptimizedLabels = (data: any[], period: PeriodType) => {
  if (!data || data.length === 0) return []

  // Número ideal de labels no eixo X para cada período
  let targetLabelCount = 12 // Padrão

  switch (period) {
    case '1M':
      targetLabelCount = 6 // ~1 por semana
      break
    case '6M':
      targetLabelCount = 12 // ~2 por mês
      break
    case '1A':
      targetLabelCount = 12 // 1 por mês
      break
    case '5A':
      targetLabelCount = 15 // ~3 por ano
      break
    case 'MAX':
      targetLabelCount = 20 // Distribuídos ao longo de todo o período
      break
  }

  // Se temos menos pontos que o número alvo de labels, usamos todos
  if (data.length <= targetLabelCount) {
    return data.map((item) => item.dataFormatada)
  }

  // Calculamos o intervalo para distribuir os labels uniformemente
  const interval = Math.max(1, Math.floor(data.length / targetLabelCount))

  // Geramos os índices dos pontos que terão labels
  const labelIndices = [0] // Sempre incluímos o primeiro

  for (let i = interval; i < data.length - 1; i += interval) {
    labelIndices.push(i)
  }

  // Sempre incluímos o último
  if (data.length > 1) {
    labelIndices.push(data.length - 1)
  }

  return labelIndices
}
