import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

/**
 * Formats historical data points for display, adding a `dataFormatada` property.
 * @param data - An array of PriceDataPoint objects.
 * @returns An array of PriceDataPoint objects with an added `dataFormatada` property.
 */
export const formatHistoricalData = (data: PriceDataPoint[]) => {
  return data.map((item) => ({
    data: item.data,
    valor: item.valor,
    timestamp: item.timestamp,
    dataFormatada: new Date(item.data).toLocaleDateString('pt-BR'),
  }))
}
