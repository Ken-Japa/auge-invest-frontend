export interface DadosAnaliseFundamental {
  // Dados Básicos da Empresa
  precoAcao: number // Preço da Ação
  acoesCirculacao: number // Número de Ações em Circulação

  // Demonstração de Resultados (DRE)
  receitaLiquida: number // Receita Líquida
  custoProdutos: number // Custo dos Produtos Vendidos (CPV)
  ebitda: number // EBITDA
  ebit: number // EBIT
  lucroLiquido: number // Lucro Líquido
  impostoRenda: number // Imposto de Renda

  // Balanço Patrimonial
  patrimonioLiquido: number // Patrimônio Líquido
  dividaLiquida: number // Dívida Líquida
  caixaEquivalentes: number // Caixa e Equivalentes

  // Outros Dados Relevantes
  dividendosPagos: number // Dividendos Pagos
  fluxoCaixaOperacional: number // Fluxo de Caixa Operacional
  fluxoCaixaLivre: number // Fluxo de Caixa Livre (FCO - CAPEX)
}

export interface MetricasCalculadas {
  precoLucro: number // P/L
  evEbitda: number // EV/EBITDA
  margemLiquida: number // Margem Líquida
  roe: number // ROE
  roic: number // ROIC
  dividaLiquidaEbitda: number // Dívida Líquida/EBITDA
  dividendYield: number // Dividend Yield
  precoValorPatrimonial: number // P/VPA
  margemBruta: number // Margem Bruta
  payoutRatio: number // Índice de Distribuição de Dividendos
  evReceita: number // EV/Receita
  margemOperacional: number // Margem Operacional
  enterpriseValue: number // Valor da Empresa (EV)
  rendimentoDividendos: number // Rendimento de Dividendos
  indiceDistribuicao: number // Índice de Distribuição
}

// Add the ScenarioInputs interface
export interface ScenarioInputs {
  wacc: number
  crescimentoProjecao: number
  crescimentoTerminal: number
}

// Add ValuationInputs interface
export interface ValuationInputs {
  wacc: number
  crescimentoProjecao: number
  crescimentoTerminal: number
}

// Add HistoricalFCF interface
export interface HistoricalFCF {
  year: number
  value: number | null
}

// Add ValuationResults interface
export interface ValuationResults {
  precoJusto: number
  upside: number
  valorPresente: number
  valorTerminal: number
  valorEmpresa: number
  valorPatrimonial: number
}

// Add SensitivityResults interface
export interface SensitivityResults {
  base: ValuationResults
  otimista: ValuationResults
  pessimista: ValuationResults
}
