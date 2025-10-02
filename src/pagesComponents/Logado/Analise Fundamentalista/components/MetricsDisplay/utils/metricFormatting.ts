interface MetricThreshold {
  min: number
  max: number
  isHigherBetter: boolean
}

const metricThresholds: Record<string, MetricThreshold> = {
  precoLucro: { min: 15, max: 25, isHigherBetter: false },
  evEbitda: { min: 8, max: 12, isHigherBetter: false },
  precoValorPatrimonial: { min: 1.5, max: 3, isHigherBetter: false },
  margemLiquida: { min: 5, max: 15, isHigherBetter: true },
  margemBruta: { min: 20, max: 40, isHigherBetter: true },
  roe: { min: 10, max: 15, isHigherBetter: true },
  roic: { min: 10, max: 15, isHigherBetter: true },
  dividaLiquidaEbitda: { min: 3, max: 5, isHigherBetter: false },
  dividendos: { min: 2, max: 4, isHigherBetter: true },
  evReceita: { min: 1, max: 3, isHigherBetter: false },
  margemOperacional: { min: 10, max: 20, isHigherBetter: true },
  distribuicaoLucro: { min: 25, max: 75, isHigherBetter: true },
}

export const getMetricColor = (metricKey: string, value: number): string => {
  const threshold = metricThresholds[metricKey]
  if (!threshold) return 'inherit' // Neutral color for metrics without thresholds

  const { min, max, isHigherBetter } = threshold

  // Calculate percentage within range
  let percentage: number
  if (isHigherBetter) {
    if (value <= min) percentage = 0
    else if (value >= max) percentage = 1
    else percentage = (value - min) / (max - min)
  } else {
    if (value <= min) percentage = 1
    else if (value >= max) percentage = 0
    else percentage = 1 - (value - min) / (max - min)
  }

  // Convert percentage to color (green to yellow to red)
  const hue = percentage * 120 // 120 for green, 60 for yellow, 0 for red
  return `hsl(${hue}, 70%, 45%)` // Adjusted saturation and lightness for better visibility
}
