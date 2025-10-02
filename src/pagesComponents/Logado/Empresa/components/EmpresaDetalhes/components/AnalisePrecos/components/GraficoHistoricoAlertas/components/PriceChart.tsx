import { useTheme } from '@mui/material/styles'
import { ResponsiveLine } from '@nivo/line'
import React from 'react'

import { TooltipContainer, TooltipLabel, TooltipRow, TooltipTitle, TooltipValue } from '../styled'
import { ChartDataPoint, ChartMarker } from '../utils/types'

interface PriceChartProps {
  formattedChartData: { id: string; data: ChartDataPoint[] }[]
  customTickValues: string[]
  markers: ChartMarker[]
  chartStyles: any
  alertaCompra: number | null
  alertaVenda: number | null
  chartDataLength: number
}

/**
 * @function PriceChart
 * @description Component to render the historical price chart with alerts.
 * @param {PriceChartProps} props - Props for the PriceChart component.
 */
const PriceChart: React.FC<PriceChartProps> = ({
  formattedChartData,
  customTickValues,
  markers,
  chartStyles,
  alertaCompra,
  alertaVenda,
  chartDataLength,
}) => {
  const theme = useTheme()

  return (
    <ResponsiveLine
      data={formattedChartData}
      margin={{ top: 20, right: 30, bottom: 100, left: 90 }}
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
        tickRotation: -45,
        tickPadding: 20,
        format: (value) => value,
        tickValues: customTickValues.length > 0 ? customTickValues : undefined,
        renderTick: ({ x, y, value }) => (
          <g transform={`translate(${x},${y})`}>
            <text
              transform="rotate(-45)"
              textAnchor="end"
              dominantBaseline="middle"
              fill={theme.palette.text.secondary}
              fontSize="12px"
            >
              {value}
            </text>
          </g>
        ),
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value) => `R$ ${Number(value).toFixed(2)}`,
        renderTick: ({ x, y, value }) => (
          <g transform={`translate(${x},${y})`}>
            <text
              x={-10}
              y={0}
              transform="rotate(-45)"
              textAnchor="end"
              dominantBaseline="middle"
              fill={theme.palette.text.secondary}
              fontSize="12px"
            >
              {value}
            </text>
          </g>
        ),
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={8}
      pointColor={chartStyles.colors.background}
      pointBorderWidth={2}
      tooltip={({ point }) => (
        <TooltipContainer>
          <TooltipTitle variant="body2">Data: {String(point.data.x)}</TooltipTitle>
          <TooltipRow>
            <TooltipLabel variant="body2">Preço:</TooltipLabel>
            <TooltipValue variant="body2">R$ {Number(point.data.y).toFixed(2)}</TooltipValue>
          </TooltipRow>
          {alertaCompra && (
            <TooltipRow>
              <TooltipLabel variant="body2">Alerta de Compra:</TooltipLabel>
              <TooltipValue
                variant="body2"
                color={
                  Number(point.data.y) <= alertaCompra ? chartStyles.colors.success : chartStyles.colors.text
                }
              >
                R$ {alertaCompra.toFixed(2)}
              </TooltipValue>
            </TooltipRow>
          )}
          {alertaVenda && (
            <TooltipRow>
              <TooltipLabel variant="body2">Alerta de Venda:</TooltipLabel>
              <TooltipValue
                variant="body2"
                color={
                  Number(point.data.y) >= alertaVenda ? chartStyles.colors.error : chartStyles.colors.text
                }
              >
                R$ {alertaVenda.toFixed(2)}
              </TooltipValue>
            </TooltipRow>
          )}
        </TooltipContainer>
      )}
      lineWidth={1.5}
      colors={[chartStyles.colors.primary]}
      enableArea={false}
      enablePoints={chartDataLength < 60}
      curve="monotoneX"
      useMesh={true}
      enableSlices="x"
      markers={markers}
    />
  )
}

export default PriceChart
