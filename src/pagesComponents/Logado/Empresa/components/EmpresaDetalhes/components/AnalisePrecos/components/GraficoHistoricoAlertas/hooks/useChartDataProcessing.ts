import { useEffect, useMemo, useState } from 'react'

import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

import { ChartDataPoint } from '../utils/types'

interface UseChartDataProcessingResult {
  chartData: ChartDataPoint[]
  formattedChartData: { id: string; data: ChartDataPoint[] }[]
  customTickValues: string[]
}

export const useChartDataProcessing = (data: PriceDataPoint[]): UseChartDataProcessingResult => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    if (data) {
      const processedData: ChartDataPoint[] = data.map((item, index) => ({
        x: new Date(item.data).toLocaleDateString('pt-BR'),
        y: item.valor,
        showLabel: index === 0 || index === data.length - 1 || index % 5 === 0,
        originalData: item,
      }))
      setChartData(processedData)
    }
  }, [data])

  const formattedChartData = useMemo(() => {
    return [
      {
        id: 'Valor',
        data: chartData.map((item) => ({
          x: item.x,
          y: item.y,
          showLabel: item.showLabel,
          originalData: item.originalData,
        })),
      },
    ]
  }, [chartData])

  const customTickValues = useMemo(() => {
    return formattedChartData[0]?.data.filter((d) => d.showLabel).map((d) => d.x) || []
  }, [formattedChartData])

  return { chartData, formattedChartData, customTickValues }
}
