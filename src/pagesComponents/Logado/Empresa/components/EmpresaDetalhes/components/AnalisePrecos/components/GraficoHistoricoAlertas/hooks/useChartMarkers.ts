import { useMemo } from 'react'

import { chartConfig } from '../utils/chartConfig'
import { ChartMarker } from '../utils/types'

/**
 * @function useChartMarkers
 * @description Custom hook to configure alert markers for the chart.
 * @param {number | null} alertaCompra - The purchase alert value.
 * @param {number | null} alertaVenda - The sale alert value.
 * @param {any} chartStyles - The chart styles containing color information.
 * @returns {ChartMarker[]}
 */
export const useChartMarkers = (
  alertaCompra: number | null,
  alertaVenda: number | null,
  chartStyles: any,
): ChartMarker[] => {
  const markers: ChartMarker[] = useMemo(() => {
    const newMarkers: ChartMarker[] = []

    if (alertaCompra !== null && alertaCompra !== undefined) {
      newMarkers.push({
        axis: 'y',
        value: alertaCompra,
        lineStyle: {
          ...chartConfig.markerLineStyle,
          stroke: chartStyles.colors.success,
        },
        legend: `Alerta de Compra: ${alertaCompra}`,
        legendPosition: 'top',
        legendOrientation: 'horizontal',
        textStyle: {
          ...chartConfig.markerTextStyle,
          fill: chartStyles.colors.success,
        },
      })
    }

    if (alertaVenda !== null && alertaVenda !== undefined) {
      newMarkers.push({
        axis: 'y',
        value: alertaVenda,
        lineStyle: {
          ...chartConfig.markerLineStyle,
          stroke: chartStyles.colors.error,
        },
        legend: `Alerta de Venda: ${alertaVenda}`,
        legendPosition: 'bottom',
        legendOrientation: 'horizontal',
        textStyle: {
          ...chartConfig.markerTextStyle,
          fill: chartStyles.colors.error,
        },
      })
    }

    return newMarkers
  }, [alertaCompra, alertaVenda, chartStyles.colors.success, chartStyles.colors.error])

  return markers
}
