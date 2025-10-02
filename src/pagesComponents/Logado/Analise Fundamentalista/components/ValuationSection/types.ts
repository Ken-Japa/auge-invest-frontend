export interface ValuationDetails {
  fluxosCaixa: number[]
  valorPresente: number
  valorTerminal: number
  valorPresenteTerminal: number
  spreadWaccCrescimento: number
  waccUtilizado: number
}

export interface ValuationResults {
  precoJusto: number
  enterpriseValue: number
  equityValue: number
  subvalorizacao: number
  pl: number
  taxaProjecaoUtilizada: number
  crescimentoTerminalUtilizado: number
  detalhes: ValuationDetails
}

export interface ValuationSectionProps {
  fluxoCaixaOperacional: number
  fluxoCaixaLivre: number
  precoAcao: number
  acoesCirculacao: number
  dividaLiquida: number
  ebitda: number
  lucroLiquido: number
  patrimonioLiquido: number
  caixaEquivalentes: number
  onResultsChange?: (results: ValuationResults | null) => void
  onSensitivityResultsChange?: (results: SensitivityResults | null) => void
}

export interface HistoricalFCF {
  year: number
  value: number | null
}

export interface ValuationInputs {
  wacc: number
  crescimentoTerminal: number
  crescimentoProjecao: number
}

export interface ScenarioInput extends ValuationInputs {
  tipo: 'base' | 'otimista' | 'pessimista'
}

export interface ScenarioInputs {
  base: ValuationInputs
  otimista: ValuationInputs
  pessimista: ValuationInputs
}

export interface SensitivityResults {
  base: ValuationResults
  otimista: ValuationResults
  pessimista: ValuationResults
}
