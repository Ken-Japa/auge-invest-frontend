import { MetricName } from './types'

export const METRIC_DESCRIPTIONS: Record<MetricName, string> = {
  precoLucro:
    'Indica quantos anos seriam necessários para o investidor recuperar o valor investido se a empresa mantiver o mesmo lucro.',
  evEbitda: 'Indica o valor total da empresa em relação à sua geração de caixa operacional.',
  margemLiquida: 'Percentual do lucro líquido em relação à receita líquida.',
  roe: 'Retorno sobre o Patrimônio Líquido - Mede a eficiência da empresa em gerar lucro com o capital dos acionistas.',
  roic: 'Retorno sobre o Capital Investido - Avalia o retorno gerado sobre o capital total investido na operação.',
  dividaLiquidaEbitda:
    'Indica quantos anos de geração de caixa operacional seriam necessários para pagar a dívida líquida.',
  dividendYield: 'Percentual de rendimento dos dividendos em relação ao preço da ação.',
  precoValorPatrimonial: 'Relação entre o preço da ação e seu valor patrimonial.',
  margemBruta: 'Percentual da receita que sobra após deduzir os custos diretos.',
  payoutRatio: 'Percentual do lucro distribuído aos acionistas.',
  evReceita: 'Relação entre o valor da empresa e sua receita.',
  margemOperacional: 'Percentual de lucro operacional em relação à receita.',
}

export const METRIC_FORMULAS: Record<MetricName, string> = {
  precoLucro: 'P/L = Preço da Ação / (Lucro Líquido / Número de Ações)',
  evEbitda: 'EV/EBITDA = (Valor de Mercado + Dívida Líquida) / EBITDA',
  margemLiquida: 'ML = (Lucro Líquido / Receita Líquida) × 100',
  roe: 'ROE = (Lucro Líquido / Patrimônio Líquido) × 100',
  roic: 'ROIC = (EBIT × (1 - Taxa de Imposto)) / (Capital Investido) × 100',
  dividaLiquidaEbitda: 'DL/EBITDA = Dívida Líquida / EBITDA',
  dividendYield: 'DY = (Dividendos por Ação / Preço da Ação) × 100',
  precoValorPatrimonial: 'P/VP = Preço da Ação / (Patrimônio Líquido / Número de Ações)',
  margemBruta: 'MB = ((Receita Líquida - Custo dos Produtos) / Receita Líquida) × 100',
  payoutRatio: 'Payout = (Dividendos Pagos / Lucro Líquido) × 100',
  evReceita: 'EV/Receita = (Valor de Mercado + Dívida Líquida) / Receita Líquida',
  margemOperacional: 'MO = (EBIT / Receita Líquida) × 100',
}
