import { Theme } from '@nivo/core'

export const getChartTheme = (
  gridXColor: string,
  gridYColor: string,
  xAxisTickColor: string,
  yAxisTickColor: string,
  xAxisTickTextColor: string,
  yAxisTickTextColor: string,
  xAxisLegendColor: string,
  yAxisLegendColor: string,
): Theme => ({
  grid: {
    line: {
      stroke: gridXColor,
      strokeWidth: 1,
    },
  },
  axis: {
    domain: {
      line: {
        stroke: xAxisTickColor || '#777777',
        strokeWidth: 1,
      },
    },
    ticks: {
      text: {
        fill: xAxisTickTextColor || yAxisTickTextColor || '#333333',
        fontSize: 12,
        fontWeight: 'bold',
      },
      line: {
        stroke: xAxisTickColor || yAxisTickColor || '#777777',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fill: xAxisLegendColor || yAxisLegendColor || '#333333',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  },
  tooltip: {
    container: {
      background: '#ffffff',
      color: '#333333',
      fontSize: 12,
      borderRadius: 4,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
      padding: 8,
    },
  },
})
