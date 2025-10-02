import { HistoricalFCF, ValuationResults } from '../types'

// Define a more specific ScenarioInputs interface for this file
interface ScenarioInputs {
  wacc: number
  crescimentoProjecao: number
  crescimentoTerminal: number
  tipo?: 'base' | 'otimista' | 'pessimista' // Make tipo optional
}

export const calculateGrowthRate = (historicalData: HistoricalFCF[], defaultRate: number): number => {
  const validData = historicalData.filter((item) => item.value !== null && item.value !== 0)
  if (validData.length >= 2) {
    const sorted = [...validData].sort((a, b) => a.year - b.year)
    const initial = sorted[0].value as number
    const final = sorted[sorted.length - 1].value as number
    const years = sorted.length - 1

    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100
    // Handle extreme cases and return a reasonable growth rate
    if (!Number.isFinite(cagr) || Math.abs(cagr) > 100) {
      return defaultRate
    }
    return cagr
  }
  return defaultRate
}

export const calculateScenario = (
  inputs: ScenarioInputs,
  fcl: number,
  dividaLiquida: number,
  caixaEquivalentes: number,
  acoesCirculacao: number,
  precoAcao: number,
  lucroLiquido: number,
  historicalData: HistoricalFCF[] = [],
): ValuationResults => {
  // Validate inputs
  if (fcl <= 0) {
    throw new Error('FCL deve ser positivo para valuation por DCF')
  }
  if (acoesCirculacao <= 0) {
    throw new Error('Número de ações deve ser positivo')
  }
  if (inputs.wacc <= 0) {
    throw new Error('WACC deve ser positivo')
  }

  // Additional input validation
  if (inputs.wacc <= inputs.crescimentoTerminal) {
    throw new Error('WACC deve ser significativamente maior que o crescimento terminal')
  }

  // Calculate and validate growth rates with industry constraints
  const historicalGrowth = calculateGrowthRate(historicalData, inputs.crescimentoProjecao)

  let taxaProjecao = inputs.crescimentoProjecao
  let waccUtilizado = inputs.wacc

  if (historicalData.length >= 2) {
    if (inputs.tipo === 'base') {
      // Base case: Use historical growth but cap it at GDP growth + 1%
      taxaProjecao = Math.min(historicalGrowth, 3.5)
      // Adjust WACC based on historical data for base case
      waccUtilizado = Math.max(inputs.wacc, historicalGrowth + 3) // Ensure minimum spread
    } else if (inputs.tipo === 'otimista') {
      // Optimistic: Cap at 2x historical or 5%, whichever is lower
      const optimisticGrowth = Math.min(historicalGrowth * 2, 5)
      taxaProjecao = Math.min(optimisticGrowth, inputs.crescimentoProjecao)
    } else if (inputs.tipo === 'pessimista') {
      // Pessimistic: Use 0% or historical/2, whichever is lower
      const pessimisticGrowth = Math.min(0, historicalGrowth / 2)
      taxaProjecao = Math.max(pessimisticGrowth, -2) // Floor at -2%
    }
  }

  // More conservative terminal growth based on long-term GDP expectations
  const maxTerminalGrowth = Math.min(waccUtilizado - 3, 2) // Use adjusted WACC
  const crescimentoTerminalAjustado = Math.min(inputs.crescimentoTerminal, maxTerminalGrowth)

  if (crescimentoTerminalAjustado >= inputs.wacc) {
    throw new Error('Crescimento terminal ajustado não pode ser maior ou igual ao WACC')
  }

  // Project future cash flows with safety checks
  const fcfProjections = Array(5)
    .fill(0)
    .map((_, i) => {
      const projected = fcl * Math.pow(1 + taxaProjecao / 100, i + 1)
      return Math.max(projected, fcl * 0.1) // Ensure FCF doesn't go below 10% of current
    })

  // Calculate terminal value with additional validation
  const spreadMinimo = waccUtilizado / 100 - crescimentoTerminalAjustado / 100
  if (spreadMinimo < 0.02) {
    // Minimum 2% spread
    throw new Error('Diferença entre WACC e crescimento terminal deve ser pelo menos 2%')
  }

  const terminalValue = (fcfProjections[4] * (1 + crescimentoTerminalAjustado / 100)) / spreadMinimo

  // Rest of the calculations remain the same
  const presentValueFCF = fcfProjections.reduce(
    (acc, fcf, i) => acc + fcf / Math.pow(1 + waccUtilizado / 100, i + 1),
    0,
  )

  const presentValueTV = terminalValue / Math.pow(1 + waccUtilizado / 100, 5)
  const enterpriseValue = presentValueFCF + presentValueTV
  const equityValue = enterpriseValue - dividaLiquida
  const precoJusto = (equityValue * 1000) / acoesCirculacao

  return {
    precoJusto,
    enterpriseValue: enterpriseValue,
    equityValue: equityValue,
    subvalorizacao: (precoJusto / precoAcao - 1) * 100,
    pl: precoJusto / ((lucroLiquido * 1000) / acoesCirculacao),
    taxaProjecaoUtilizada: taxaProjecao,
    crescimentoTerminalUtilizado: crescimentoTerminalAjustado,
    detalhes: {
      fluxosCaixa: fcfProjections,
      valorPresente: presentValueFCF,
      valorTerminal: terminalValue,
      valorPresenteTerminal: presentValueTV,
      spreadWaccCrescimento: spreadMinimo * 100,
      waccUtilizado,
    },
  }
}
