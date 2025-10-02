import { DadosAnaliseFundamental } from '../../../../types'
import { SaveReportOptions } from '../../index'
import { METRIC_DESCRIPTIONS, METRIC_FORMULAS } from '../constants'
import { formatCurrency, formatNumber, hasValue } from '../helpers'
import { MetricItem, MetricName } from '../types'

export const generateDebt = (
  fundamentalData: DadosAnaliseFundamental,
  options: SaveReportOptions,
): string => {
  const endividamento: MetricItem[] = [
    {
      name: 'Dívida Líquida',
      value: fundamentalData.dividaLiquida ? fundamentalData.dividaLiquida * 1000 : undefined,
      isCurrency: true,
    },
    {
      name: 'Dívida Líquida/EBITDA',
      value:
        fundamentalData.dividaLiquida && fundamentalData.ebitda
          ? fundamentalData.dividaLiquida / fundamentalData.ebitda
          : undefined,
      key: 'dividaLiquidaEbitda' as MetricName,
    },
  ].filter((metric) => hasValue(metric.value))

  if (endividamento.length === 0) return ''

  let section = `### Indicadores de Endividamento\n\n`
  endividamento.forEach((metric) => {
    const value = formatNumber(metric.value)
    section += `- ${metric.name}: ${metric.isCurrency ? formatCurrency(value) : value.toFixed(2)}\n`
    if (options.showDescriptions && metric.key && METRIC_DESCRIPTIONS[metric.key]) {
      section += `  > ${METRIC_DESCRIPTIONS[metric.key]}\n`
    }
    if (options.showFormulas && metric.key && METRIC_FORMULAS[metric.key]) {
      section += `  Formula: ${METRIC_FORMULAS[metric.key]}\n\n`
    }
  })

  return section + '\n\n'
}
