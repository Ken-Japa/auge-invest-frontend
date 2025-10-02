export const FIELD_LABELS: Record<string, string> = {
  precoAcao: 'Preço da Ação',
  acoesCirculacao: 'Ações em Circulação',
  receitaLiquida: 'Receita Líquida',
  custoProdutos: 'Custo dos Produtos Vendidos',
  ebitda: 'EBITDA',
  ebit: 'EBIT',
  lucroLiquido: 'Lucro Líquido',
  impostoRenda: 'Imposto de Renda',
  patrimonioLiquido: 'Patrimônio Líquido',
  caixaEquivalentes: 'Caixa e Equivalentes',
  dividaLiquida: 'Dívida Líquida',
  dividendosPagos: 'Dividendos Pagos',
}

export type MetricType = 'currency' | 'multiplier' | 'percentage'
