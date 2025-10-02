import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

/**
 * Filters historical data based on a target date and period.
 * If no data is found after filtering, it attempts to return a reasonable subset of available data.
 * @param allData - The complete array of historical price data.
 * @param targetDate - The target date to filter the data from.
 * @param period - The period for which data is requested (e.g., "1M", "MAX").
 * @returns An array of filtered PriceDataPoint objects.
 */
export const filterHistoricalData = (
  allData: PriceDataPoint[],
  targetDate: Date | null,
  period: string,
): PriceDataPoint[] => {
  // Ordenar todos os dados por data
  allData.sort((a, b) => a.timestamp - b.timestamp)

  // Filtrar dados com base na data alvo (se aplicável)
  let filteredData = allData
  if (targetDate !== null && period !== 'MAX') {
    const targetTimestamp = targetDate.getTime()
    filteredData = allData.filter((item) => item.timestamp >= targetTimestamp)
  }

  // Se após a filtragem não temos dados, retornamos os dados mais recentes disponíveis
  if (filteredData.length === 0 && allData.length > 0) {
    // Determinar um período razoável com base nos dados disponíveis
    const latestDate = new Date(Math.max(...allData.map((item) => item.timestamp)))
    const oldestDate = new Date(Math.min(...allData.map((item) => item.timestamp)))

    const availableMonths = (latestDate.getTime() - oldestDate.getTime()) / (30 * 24 * 60 * 60 * 1000)

    // Selecionar um subconjunto razoável dos dados disponíveis
    if (availableMonths > 1) {
      const cutoffDate = new Date(latestDate)
      cutoffDate.setMonth(latestDate.getMonth() - Math.min(6, Math.floor(availableMonths)))

      filteredData = allData.filter((item) => item.timestamp >= cutoffDate.getTime())
    } else {
      // Se temos menos de um mês de dados, usamos todos
      filteredData = allData
    }
  }

  return filteredData
}
