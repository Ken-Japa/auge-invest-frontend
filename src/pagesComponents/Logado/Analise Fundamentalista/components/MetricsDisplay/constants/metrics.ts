import { DadosAnaliseFundamental } from '../../../types'
import { checkMissingFields } from '../utils/utils'

export const calculateMetrics = (
  data: DadosAnaliseFundamental,
  getFieldLabel: (field: keyof DadosAnaliseFundamental) => string,
) => {
  const calculateMetric = (requiredFields: (keyof DadosAnaliseFundamental)[], calculation: () => number) => {
    const missingFields = checkMissingFields(data, requiredFields, getFieldLabel)
    if (missingFields.length > 0) return { value: 0, missingFields, isInvalid: false }

    try {
      const result = calculation()
      return {
        value: isNaN(result) ? 0 : result,
        missingFields: [],
        isInvalid: isNaN(result),
      }
    } catch (error) {
      return {
        value: 0,
        missingFields: [],
        isInvalid: true,
      }
    }
  }

  return {
    marketCap: calculateMetric(['precoAcao', 'acoesCirculacao'], () => data.precoAcao * data.acoesCirculacao),
    enterpriseValue: calculateMetric(
      ['precoAcao', 'acoesCirculacao', 'dividaLiquida', 'caixaEquivalentes'],
      () => {
        const marketCap = (data.precoAcao * data.acoesCirculacao) / 1000
        return (marketCap + data.dividaLiquida - data.caixaEquivalentes) * 1000
      },
    ),
    precoLucro: calculateMetric(['precoAcao', 'lucroLiquido', 'acoesCirculacao'], () => {
      if (data.lucroLiquido <= 0) return NaN // Invalid P/L for negative profit
      const lucroLiquidoPorAcao = (data.lucroLiquido * 1000) / data.acoesCirculacao
      return data.precoAcao / lucroLiquidoPorAcao
    }),
    evEbitda: calculateMetric(
      ['precoAcao', 'acoesCirculacao', 'dividaLiquida', 'ebitda', 'caixaEquivalentes'],
      () => {
        if (data.ebitda <= 0) return NaN // Invalid EV/EBITDA for negative EBITDA
        const marketCap = (data.precoAcao * data.acoesCirculacao) / 1000
        const enterpriseValue = marketCap + data.dividaLiquida - data.caixaEquivalentes
        return enterpriseValue / data.ebitda
      },
    ),
    roic: calculateMetric(
      ['ebit', 'impostoRenda', 'lucroLiquido', 'dividaLiquida', 'patrimonioLiquido', 'caixaEquivalentes'],
      () => {
        if (data.ebit === 0) return NaN
        const ebt = data.lucroLiquido + data.impostoRenda
        const taxRate = data.impostoRenda / ebt
        const nopat = data.ebit * (1 - taxRate)
        const dividaBruta = data.dividaLiquida + data.caixaEquivalentes
        const capitalInvestido = dividaBruta + data.patrimonioLiquido
        return (nopat / capitalInvestido) * 100
      },
    ),
    dividaLiquidaEbitda: calculateMetric(['dividaLiquida', 'ebitda'], () => {
      if (data.ebitda === 0) return NaN // Avoid division by zero
      return data.dividaLiquida / data.ebitda
    }),
    dividendYield: calculateMetric(['dividendosPagos', 'precoAcao', 'acoesCirculacao'], () => {
      const marketCap = (data.precoAcao * data.acoesCirculacao) / 1000
      return (data.dividendosPagos / marketCap) * 100
    }),
    precoValorPatrimonial: calculateMetric(['precoAcao', 'patrimonioLiquido', 'acoesCirculacao'], () => {
      if (data.patrimonioLiquido <= 0) return NaN
      const valorPatrimonialPorAcao = (data.patrimonioLiquido * 1000) / data.acoesCirculacao
      return data.precoAcao / valorPatrimonialPorAcao
    }),
    margemLiquida: calculateMetric(['lucroLiquido', 'receitaLiquida'], () => {
      if (data.receitaLiquida <= 0) return NaN
      return (data.lucroLiquido / data.receitaLiquida) * 100
    }),
    margemBruta: calculateMetric(['receitaLiquida', 'custoProdutos'], () => {
      if (data.receitaLiquida <= 0) return NaN
      return ((data.receitaLiquida - data.custoProdutos) / data.receitaLiquida) * 100
    }),
    roe: calculateMetric(['lucroLiquido', 'patrimonioLiquido'], () => {
      if (data.patrimonioLiquido === 0) return NaN // Only check for division by zero
      return (data.lucroLiquido / data.patrimonioLiquido) * 100
    }),
    payoutRatio: calculateMetric(['dividendosPagos', 'lucroLiquido'], () => {
      if (data.lucroLiquido <= 0) return NaN
      return (data.dividendosPagos / data.lucroLiquido) * 100
    }),

    evReceita: calculateMetric(
      ['precoAcao', 'acoesCirculacao', 'dividaLiquida', 'caixaEquivalentes', 'receitaLiquida'],
      () => {
        if (data.receitaLiquida <= 0) return NaN
        const marketCap = (data.precoAcao * data.acoesCirculacao) / 1000
        const enterpriseValue = marketCap + data.dividaLiquida - data.caixaEquivalentes
        return enterpriseValue / data.receitaLiquida
      },
    ),

    margemOperacional: calculateMetric(['ebit', 'receitaLiquida'], () => {
      if (data.receitaLiquida <= 0) return NaN
      return (data.ebit / data.receitaLiquida) * 100
    }),
  }
}
