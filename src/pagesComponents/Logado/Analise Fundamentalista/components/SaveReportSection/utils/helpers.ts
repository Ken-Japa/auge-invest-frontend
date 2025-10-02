export const formatNumber = (value: any): number => {
  const num = Number(value)
  return isNaN(num) ? 0 : num
}

export const hasValue = (value: number | undefined | null): boolean => {
  return value !== undefined && value !== null && value !== 0
}

export const formatCurrency = (value: number): string => `R$ ${value.toLocaleString()}`

export const formatPercentage = (value: number): string => `${value.toFixed(2)}%`

export const formatMultiple = (value: number): string => `${value.toFixed(2)}x`
