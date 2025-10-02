import { Box } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import React from 'react'

import { ChartStatusDisplay } from './utils/ChartStatusDisplay'
import { getChartTheme } from './utils/chartTheme'
import { formatChartData, getCustomTickValues } from './utils/dataUtils'
import { TooltipContent } from './utils/TooltipContent'

export interface LineChartProps {
  data: { data: string; valor: number; showLabel?: boolean; [key: string]: any }[]
  loading?: boolean
  xKey?: string
  yKey?: string
  labelFormat?: (value: number) => string
  height?: number | string
  xAxisProps?: {
    angle?: number
    textAnchor?: string
    height?: number
    fontSize?: number
    tickColor?: string
    tickTextColor?: string
    legendColor?: string
    [key: string]: any
  }
  yAxisProps?: {
    width?: number
    fontSize?: number
    tickFormatter?: (value: number) => string
    tickColor?: string
    tickTextColor?: string
    legendColor?: string
    [key: string]: any
  }
  tooltipProps?: {
    formatter?: (value: number) => [string] | [string, string]
    labelFormatter?: (label: string) => string
    [key: string]: any
  }
  chartProps?: {
    enableGridX?: boolean
    enableGridY?: boolean
    gridXColor?: string
    gridYColor?: string
    lineWidth?: number
    enableArea?: boolean
    areaOpacity?: number
    enablePoints?: boolean
    pointSize?: number
    pointBorderWidth?: number
    pointColor?: string
    curve?: 'linear' | 'monotoneX' | 'step' | 'stepBefore' | 'stepAfter'
    colors?: string[]
    [key: string]: any
  }
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  loading = false,
  xKey = 'data',
  yKey = 'valor',
  labelFormat = (value) => `${value}`,
  height = 400,
  xAxisProps = {},
  yAxisProps = {},
  tooltipProps = {},
  chartProps = {},
}) => {
  if (loading || !data || data.length === 0) {
    return <ChartStatusDisplay loading={loading} hasData={!!data && data.length > 0} height={height} />
  }

  // Format data for Nivo Line chart
  const chartData = formatChartData(data, xKey, yKey)

  // Default formatter for tooltip
  const defaultFormatter = (value: number): [string] => [labelFormat(value)]
  const defaultLabelFormatter = (label: string) => label

  // Use custom formatters if provided, otherwise use defaults
  const valueFormatter = tooltipProps.formatter || defaultFormatter
  const labelFormatter = tooltipProps.labelFormatter || defaultLabelFormatter

  // Extract chart specific props
  const {
    enableGridX = true,
    enableGridY = true,
    gridXColor = '#e0e0e0',
    gridYColor = '#e0e0e0',
    lineWidth = 2,
    enableArea = false,
    areaOpacity = 0.2,
    enablePoints = true,
    pointSize = 8,
    pointBorderWidth = 2,
    pointColor = '#ffffff',
    curve = 'monotoneX',
    colors = ['#0088cc'],
    ...restChartProps
  } = chartProps

  // Theme for better readability of axes
  const theme = getChartTheme(
    gridXColor,
    gridYColor,
    xAxisProps.tickColor || '',
    yAxisProps.tickColor || '',
    xAxisProps.tickTextColor || '',
    yAxisProps.tickTextColor || '',
    xAxisProps.legendColor || '',
    yAxisProps.legendColor || '',
  )

  // Filtrar apenas os valores que devem mostrar labels no eixo X
  const customTickValues = getCustomTickValues(chartData)

  return (
    <Box sx={{ height }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 30, bottom: 80, left: 80 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 12,
          tickRotation: xAxisProps.angle || 45,
          legendOffset: 60,
          legendPosition: 'middle',
          format: (value) => value,
          tickValues: customTickValues.length > 0 ? customTickValues : undefined,
          ...xAxisProps,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 12,
          tickRotation: 0,
          legendOffset: -65,
          legendPosition: 'middle',
          format: yAxisProps.tickFormatter || ((value) => labelFormat(value as number)),
          // Reduzir ainda mais o número de ticks no eixo Y
          tickValues: 4, // Reduzir para apenas 4 linhas principais
          ...yAxisProps,
        }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        // Definir explicitamente os valores para as linhas de grade Y
        // Isso substitui o comportamento padrão e força exatamente as linhas que queremos
        gridYValues={4} // Reduzir para apenas 4 linhas de grade
        // Reduzir a opacidade das linhas de grade para ficarem menos intrusivas
        theme={{
          ...theme,
          grid: {
            line: {
              stroke: gridXColor,
              strokeWidth: 0.5, // Reduzir a espessura das linhas
              strokeOpacity: 0.5, // Reduzir a opacidade para ficarem mais sutis
            },
          },
        }}
        colors={colors}
        lineWidth={lineWidth}
        enableArea={enableArea}
        areaOpacity={areaOpacity}
        enablePoints={enablePoints}
        pointSize={pointSize}
        pointColor={pointColor}
        pointBorderWidth={pointBorderWidth}
        pointBorderColor={{ from: 'serieColor' }}
        curve={curve}
        useMesh={true}
        tooltip={({ point }) => (
          <TooltipContent point={point} valueFormatter={valueFormatter} labelFormatter={labelFormatter} />
        )}
        {...restChartProps}
      />
    </Box>
  )
}
