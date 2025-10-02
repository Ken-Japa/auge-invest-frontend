import { useCallback, useEffect, useState } from 'react'

import type {
  HistoricalFCF,
  ScenarioInputs,
  SensitivityResults,
  ValuationInputs,
  ValuationResults,
  ValuationSectionProps,
} from '../types'
import { calculateGrowthRate, calculateScenario } from '../utils/calculations'

export const useValuationLogic = ({
  fluxoCaixaOperacional: defaultFCO,
  fluxoCaixaLivre: defaultFCL,
  precoAcao,
  acoesCirculacao,
  dividaLiquida,
  ebitda,
  lucroLiquido,
  caixaEquivalentes,
  onResultsChange,
  onSensitivityResultsChange,
}: ValuationSectionProps) => {
  const [fco, setFco] = useState(defaultFCO)
  const [fcl, setFcl] = useState(defaultFCL)
  const [historicalData, setHistoricalData] = useState<HistoricalFCF[]>([])
  const [valuationInputs, setValuationInputs] = useState<ValuationInputs>({
    wacc: 0,
    crescimentoProjecao: 0,
    crescimentoTerminal: 0,
  })
  const [scenarioInputs, setScenarioInputs] = useState<ScenarioInputs>({
    base: { wacc: 0, crescimentoProjecao: 0, crescimentoTerminal: 0 },
    otimista: { wacc: 0, crescimentoProjecao: 0, crescimentoTerminal: 0 },
    pessimista: { wacc: 0, crescimentoProjecao: 0, crescimentoTerminal: 0 },
  })
  const [results, setResults] = useState<ValuationResults | null>(null)
  const [sensitivityResults, setSensitivityResults] = useState<SensitivityResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleValuationInputChange = (field: keyof ValuationInputs, value: number) => {
    setValuationInputs((prev) => ({ ...prev, [field]: value }))
    setResults(null)
    setSensitivityResults(null)
  }

  const handleScenarioChange = (
    scenario: 'otimista' | 'pessimista',
    field: keyof ValuationInputs,
    value: number,
  ) => {
    setScenarioInputs((prev) => ({
      ...prev,
      [scenario]: { ...prev[scenario], [field]: value },
    }))
  }

  const calculateValuation = useCallback(() => {
    if (!fcl || !acoesCirculacao || !precoAcao) {
      console.error('Missing required inputs for calculation')
      return
    }

    setIsCalculating(true)

    const baseScenarioInputs = {
      wacc: valuationInputs.wacc,
      crescimentoProjecao: calculateGrowthRate(historicalData, valuationInputs.crescimentoProjecao),
      crescimentoTerminal: valuationInputs.crescimentoTerminal,
    }

    try {
      const baseResults = calculateScenario(
        baseScenarioInputs,
        fcl,
        dividaLiquida,
        caixaEquivalentes,
        acoesCirculacao,
        precoAcao,
        lucroLiquido,
        historicalData,
      )

      const otimista = calculateScenario(
        scenarioInputs.otimista,
        fcl,
        dividaLiquida,
        caixaEquivalentes,
        acoesCirculacao,
        precoAcao,
        lucroLiquido,
        historicalData,
      )

      const pessimista = calculateScenario(
        scenarioInputs.pessimista,
        fcl,
        dividaLiquida,
        caixaEquivalentes,
        acoesCirculacao,
        precoAcao,
        lucroLiquido,
        historicalData,
      )

      setResults(baseResults)
      setSensitivityResults({ base: baseResults, otimista, pessimista })

      if (onResultsChange) onResultsChange(baseResults)
      if (onSensitivityResultsChange) onSensitivityResultsChange({ base: baseResults, otimista, pessimista })
    } catch (error) {
      console.error('Error calculating valuation:', error)
    } finally {
      setIsCalculating(false)
    }
  }, [
    fcl,
    acoesCirculacao,
    precoAcao,
    dividaLiquida,
    caixaEquivalentes,
    lucroLiquido,
    valuationInputs,
    scenarioInputs,
    historicalData,
    onResultsChange,
    onSensitivityResultsChange,
  ])

  useEffect(() => {
    if (fcl && historicalData.length > 0) {
      calculateValuation()
    }
  }, [fcl, historicalData, calculateValuation])

  const handleCalculateClick = useCallback(() => {
    if (!fcl) {
      console.error('FCL is required for calculation')
      return
    }
    calculateValuation()
  }, [fcl, calculateValuation])

  return {
    fco,
    fcl,
    historicalData,
    valuationInputs,
    scenarioInputs,
    results,
    sensitivityResults,
    isCalculating,
    handleValuationInputChange,
    handleScenarioChange,
    handleCalculateClick,
    setFco,
    setFcl,
    setHistoricalData,
  }
}
