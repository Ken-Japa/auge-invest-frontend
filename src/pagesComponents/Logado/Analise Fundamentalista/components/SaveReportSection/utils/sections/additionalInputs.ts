import { DadosAnaliseFundamental } from '../../../../types'
import { formatCurrency, formatNumber, formatPercentage, hasValue } from '../helpers'
import { MetricItem } from '../types'

export const generateAdditionalInputs = (fundamentalData: DadosAnaliseFundamental): string => {
  const additionalInputs: MetricItem[] = [
    {
      name: 'Custo dos Produtos Vendidos',
      value: fundamentalData.custoProdutos ? fundamentalData.custoProdutos * 1000 : undefined,
      isCurrency: true,
    },
    {
      name: 'Imposto de Renda',
      value: fundamentalData.impostoRenda,
      isCurrency: false,
    },
    {
      name: 'Dividendos Pagos',
      value: fundamentalData.dividendosPagos ? fundamentalData.dividendosPagos * 1000 : undefined,
      isCurrency: true,
    },
  ].filter((metric) => hasValue(metric.value))

  if (additionalInputs.length === 0) return ''

  let section = `### Dados Financeiros Adicionais\n\n`
  additionalInputs.forEach((metric) => {
    const value = formatNumber(metric.value)
    section += `- ${metric.name}: ${metric.isCurrency ? formatCurrency(value) : formatPercentage(value)}\n`
  })

  return section + '\n\n'
}
