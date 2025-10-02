import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'
import { api } from '@/services/api'

import { calculateTargetDate } from './utils/dateUtils'
import { filterHistoricalData } from './utils/filterHistoricalData'
import { formatHistoricalData } from './utils/formatHistoricalData'
import { processHistoricalData } from './utils/processHistoricalData'

export const getHistoricalData = async (codigoAtivo: string, period = '5A'): Promise<PriceDataPoint[]> => {
  try {
    const targetDate = calculateTargetDate(period)

    // Configuração inicial para paginação
    const pageSize = 100
    let currentPage = 0
    let hasMoreData = true
    let allData: PriceDataPoint[] = []
    let reachedTargetDate = false
    const shouldFetchAllPages = period === 'MAX'

    // Fazer a primeira chamada para obter o total de páginas
    const initialResponse = await api.historical.getHistoricalData({
      codigo: codigoAtivo,
      pageSize: pageSize,
      page: 0,
    })

    const typedInitialResponse = initialResponse as unknown as {
      _id: string
      empresa: string
      codigo: string
      totalHistoric: number
      historic: { data: string; preco: string; volume: number }[]
      pagination: {
        offset: number
        limit: number
        total: number
        page: number
        pages: number
      }
    }

    // Determinar o total de páginas disponíveis
    const totalPages = typedInitialResponse?.pagination?.pages || 80

    // Determinar quantas páginas vamos buscar
    const pagesToFetch = shouldFetchAllPages
      ? Math.min(totalPages, 100) // Limite de 100 páginas para MAX
      : totalPages

    // Processar os dados da primeira página
    if (
      typedInitialResponse?.historic &&
      Array.isArray(typedInitialResponse.historic) &&
      typedInitialResponse.historic.length > 0
    ) {
      const pageData: PriceDataPoint[] = processHistoricalData(typedInitialResponse.historic)

      allData = [...pageData]

      // Verificar se já atingimos a data alvo com a primeira página
      if (!shouldFetchAllPages && targetDate !== null && pageData.length > 0) {
        const targetTimestamp = targetDate.getTime()
        const timestamps = pageData.map((item) => item.timestamp)
        const oldestDataInPage = Math.min(...timestamps)

        if (oldestDataInPage <= targetTimestamp) {
          reachedTargetDate = true
        }
      }
    }

    // Buscar as páginas restantes
    currentPage = 1 // Já buscamos a página 0

    while (currentPage < pagesToFetch && hasMoreData && (!reachedTargetDate || shouldFetchAllPages)) {
      // Buscar próxima página
      const historicalResponse = await api.historical.getHistoricalData({
        codigo: codigoAtivo,
        pageSize: pageSize,
        page: currentPage,
      })

      const typedResponse = historicalResponse as unknown as {
        historic: { data: string; preco: string; volume: number }[]
        pagination: {
          totalPages: number
          currentPage: number
        }
      }

      // Verificar se temos dados válidos
      if (
        !typedResponse?.historic ||
        !Array.isArray(typedResponse.historic) ||
        typedResponse.historic.length === 0
      ) {
        hasMoreData = false
        continue
      }

      // Processar os dados desta página
      const pageData: PriceDataPoint[] = processHistoricalData(typedResponse.historic)

      // Adicionar dados à coleção completa
      allData = [...allData, ...pageData]

      // Verificar se atingimos a data alvo (apenas se não estamos buscando todas as páginas)
      if (!shouldFetchAllPages && targetDate !== null && pageData.length > 0) {
        const targetTimestamp = targetDate.getTime()
        const timestamps = pageData.map((item) => item.timestamp)
        const oldestDataInPage = Math.min(...timestamps)

        if (oldestDataInPage <= targetTimestamp) {
          reachedTargetDate = true
        }
      }

      // Avançar para a próxima página
      currentPage++
    }

    // Se não encontramos dados suficientes para o período solicitado
    if (allData.length === 0) {
      return []
    }

    const filteredData = filterHistoricalData(allData, targetDate, period)

    // Adicionar dataFormatada para exibição
    return formatHistoricalData(filteredData)
  } catch (err) {
    console.error('Erro ao buscar dados históricos:', err)
    return []
  }
}
