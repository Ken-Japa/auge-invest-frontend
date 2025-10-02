import { LineChartProps } from '../index'

export const formatChartData = (data: LineChartProps['data'], xKey: string, yKey: string) => {
  return [
    {
      id: 'valores',
      data: data.map((item) => ({
        x: item[xKey],
        y: Number(item[yKey]),
        showLabel: item.showLabel,
        originalData: item, // Store original data for tooltip
      })),
    },
  ]
}

export const getCustomTickValues = (chartData: ReturnType<typeof formatChartData>) => {
  return chartData[0].data.filter((d) => d.showLabel).map((d) => d.x)
}
