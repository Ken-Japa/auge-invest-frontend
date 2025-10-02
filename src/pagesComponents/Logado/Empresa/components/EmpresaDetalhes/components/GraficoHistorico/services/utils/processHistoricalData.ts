import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

/**
 * Processes raw historical data items into PriceDataPoint objects.
 * @param historicItems An array of raw historical data items.
 * @returns An array of PriceDataPoint objects.
 */
export const processHistoricalData = (
  historicItems: { data: string; preco: string; volume: number }[],
): PriceDataPoint[] => {
  return historicItems
    .map((item) => {
      const date = new Date(item.data)
      if (isNaN(date.getTime())) {
        return null
      }
      return {
        data: item.data,
        valor: parseFloat(item.preco) || 0,
        timestamp: date.getTime(),
        // dataFormatada e showLabel são opcionais e podem ser omitidos ou definidos aqui se necessário
      } as PriceDataPoint
    })
    .filter((item): item is PriceDataPoint => item !== null)
}
