export const formatCurrency = (value: number): string => {
  if (value >= 1e9) {
    const billions = (value / 1e9).toLocaleString('pt-BR', {
      maximumFractionDigits: 3,
      minimumFractionDigits: 3,
    })
    return `R$ ${billions} Bi`
  }
  return `R$ ${(value / 1e6).toFixed(1)} Mi`.replace('.', ',')
}

export const formatPercentage = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return '0.00%'
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
}
