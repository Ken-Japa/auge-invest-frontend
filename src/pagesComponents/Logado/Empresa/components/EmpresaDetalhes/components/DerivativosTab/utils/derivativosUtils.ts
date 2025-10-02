/**
 * Formata uma data de vencimento no formato YYYYMMDD para DD/MM/YYYY.
 * @param data A data de vencimento no formato YYYYMMDD.
 * @returns A data formatada como DD/MM/YYYY ou '-' se a data for inválida.
 */
export const formatarVencimento = (data: string): string => {
  if (!data) return '-'
  const ano = data.substring(0, 4)
  const mes = data.substring(4, 6)
  const dia = data.substring(6, 8)
  return `${dia}/${mes}/${ano}`
}

/**
 * Calcula o número de dias restantes até a data de vencimento.
 * @param vencimento A data de vencimento no formato YYYYMMDD.
 * @returns O número de dias restantes até o vencimento, ou 0 se a data for inválida ou já tiver passado.
 */
export const calcularDiasAteVencimento = (vencimento: string): number => {
  if (!vencimento) return 0

  const ano = parseInt(vencimento.substring(0, 4))
  const mes = parseInt(vencimento.substring(4, 6)) - 1 // Mês é baseado em 0
  const dia = parseInt(vencimento.substring(6, 8))

  const dataVencimento = new Date(ano, mes, dia)
  const hoje = new Date()

  // Garante que a data de hoje não inclua informações de tempo para a comparação
  hoje.setHours(0, 0, 0, 0)
  dataVencimento.setHours(0, 0, 0, 0)

  const diffTime = dataVencimento.getTime() - hoje.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays)
}

/**
 * Retorna uma cor baseada no número de dias restantes para o vencimento.
 * @param dias O número de dias restantes para o vencimento.
 * @returns Uma string hexadecimal representando a cor.
 */
export const getVencimentoColor = (dias: number): string => {
  if (dias <= 0) return '#ff4d4d' // Vermelho para vencido ou hoje
  if (dias <= 30) return '#ffa64d' // Laranja para vencimento em até 1 mês
  if (dias <= 90) return '#ffff4d' // Amarelo para vencimento em até 3 meses
  return '#4dff4d' // Verde para vencimento distante
}

/**
 * Formata um valor numérico como moeda brasileira (BRL).
 * @param value O valor a ser formatado (número ou string que pode ser convertida em número).
 * @returns O valor formatado como string de moeda.
 */
export const formatCurrency = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue)
}
