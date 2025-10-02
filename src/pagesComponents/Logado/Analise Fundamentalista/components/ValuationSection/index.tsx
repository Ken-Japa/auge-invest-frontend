import { Button, Grid } from '@mui/material'

import { HistoricalDataSection } from './components/HistoricalDataSection'
import { ResultsSection } from './components/ResultsSection'
import { ScenariosSection } from './components/ScenariosSection'
import { ValuationInputsSection } from './components/ValuationInputsSection'
import { useValuationLogic } from './hooks/useValuationLogic'
import { SectionContainer, SectionTitle } from './styled'
import type { ValuationSectionProps } from './types'

export const ValuationSection = ({
  fluxoCaixaOperacional: defaultFCO,
  fluxoCaixaLivre: defaultFCL,
  precoAcao,
  acoesCirculacao,
  dividaLiquida,
  ebitda,
  lucroLiquido,
  patrimonioLiquido,
  caixaEquivalentes,
  onResultsChange,
  onSensitivityResultsChange,
}: ValuationSectionProps) => {
  const {
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
  } = useValuationLogic({
    fluxoCaixaOperacional: defaultFCO,
    fluxoCaixaLivre: defaultFCL,
    precoAcao,
    acoesCirculacao,
    dividaLiquida,
    ebitda,
    lucroLiquido,
    patrimonioLiquido,
    caixaEquivalentes,
    onResultsChange,
    onSensitivityResultsChange,
  })

  return (
    <SectionContainer>
      <SectionTitle variant="h3" gutterBottom>
        Valuation
      </SectionTitle>

      <ValuationInputsSection
        inputs={valuationInputs}
        fco={fco}
        fcl={fcl}
        onInputChange={handleValuationInputChange}
        onFcoChange={(value) => setFco(value ?? defaultFCO)}
        onFclChange={(value) => setFcl(value ?? defaultFCL)}
      />

      <HistoricalDataSection
        historicalData={historicalData}
        onAddYear={() =>
          setHistoricalData([...historicalData, { year: historicalData.length + 1, value: null }])
        }
        onRemoveYear={(index) => {
          const newData = historicalData
            .filter((_, i) => i !== index)
            .map((item, idx) => ({ ...item, year: idx + 1 }))
          setHistoricalData(newData)
        }}
        onDataChange={(index, value) => {
          const newData = [...historicalData]
          newData[index].value = value
          setHistoricalData(newData)
        }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleCalculateClick}
            fullWidth
            disabled={isCalculating || !fcl}
          >
            {isCalculating ? 'Calculando...' : 'Calcular Valuation'}
          </Button>
        </Grid>
      </Grid>

      {results && (
        <>
          <ResultsSection results={results} sensitivityResults={sensitivityResults} />
          <ScenariosSection
            scenarioInputs={scenarioInputs}
            sensitivityResults={sensitivityResults}
            onScenarioChange={handleScenarioChange}
          />
        </>
      )}
    </SectionContainer>
  )
}
