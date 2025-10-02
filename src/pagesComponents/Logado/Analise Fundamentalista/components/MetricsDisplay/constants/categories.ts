import { MetricCategory } from '../types/types'

export const metricCategories = (metrics: any): MetricCategory[] => [
  {
    title: 'Valor de Mercado',
    metrics: [
      {
        title: 'Capitalização de Mercado',
        ...metrics.marketCap,
        formula: 'Preço da Ação × Quantidade de Ações',
        description: 'Valor total de mercado da empresa',
        type: 'currency',
        metricKey: 'valorMercado',
      },
      {
        title: 'Valor da Empresa (EV)',
        ...metrics.enterpriseValue,
        formula: 'Capitalização Mercado + Dívida Líquida - Caixa',
        description: 'Valor total da empresa considerando dívida e caixa',
        type: 'currency',
        metricKey: 'valorEmpresa',
      },
    ],
  },
  {
    title: 'Valoração',
    metrics: [
      {
        title: 'P/L (Preço/Lucro)',
        ...metrics.precoLucro,
        formula: 'Preço da Ação / (Lucro Líquido por Ação)',
        description:
          'Indica quantos anos de lucro seriam necessários para recuperar o investimento (quanto menor, melhor)',
        type: 'ratio',
        metricKey: 'precoLucro',
      },
      {
        title: 'EV/EBITDA',
        ...metrics.evEbitda,
        formula: '(Capitalização Mercado + Dívida Líquida - Caixa) / EBITDA',
        description: 'Indica quantos anos de EBITDA seriam necessários para igualar o Valor da Empresa (EV)',
        type: 'ratio',
        metricKey: 'evEbitda',
      },
      {
        title: 'P/VP (Preço/Valor Patrimonial)',
        ...metrics.precoValorPatrimonial,
        formula: 'Preço da Ação / (Patrimônio Líquido / Ações)',
        description: 'Relação entre o preço de mercado e o valor contábil da empresa',
        type: 'ratio',
        metricKey: 'precoValorPatrimonial',
      },
      {
        title: 'EV/Receita',
        ...metrics.evReceita,
        formula: 'Valor da Empresa (EV) / Receita Líquida',
        description: 'Indica quanto o mercado está disposto a pagar por cada real de receita da empresa',
        type: 'ratio',
        metricKey: 'evReceita',
      },
    ],
  },
  {
    title: 'Margens',
    metrics: [
      {
        title: 'Margem Líquida',
        ...metrics.margemLiquida,
        formula: '(Lucro Líquido / Receita Líquida) × 100',
        description: 'Percentual de lucro em relação à receita',
        type: 'percentage',
        metricKey: 'margemLiquida',
      },
      {
        title: 'Margem Bruta',
        ...metrics.margemBruta,
        formula: '((Receita Líquida - Custo) / Receita Líquida) × 100',
        description: 'Percentual de lucro bruto em relação à receita',
        type: 'percentage',
        metricKey: 'margemBruta',
      },
      {
        title: 'Margem Operacional',
        ...metrics.margemOperacional,
        formula: '(EBIT / Receita Líquida) × 100',
        description:
          'Percentual de lucro operacional em relação à receita, antes dos efeitos financeiros e impostos',
        type: 'percentage',
        metricKey: 'margemOperacional',
      },
    ],
  },
  {
    title: 'Rentabilidade',
    metrics: [
      {
        title: 'ROE (Retorno sobre Patrimônio)',
        ...metrics.roe,
        formula: '(Lucro Líquido / Patrimônio Líquido) × 100',
        description: 'Mede a eficiência da empresa em gerar lucro a partir do patrimônio dos acionistas',
        type: 'percentage',
        metricKey: 'roe',
      },
      {
        title: 'ROIC (Retorno sobre Capital Investido)',
        ...metrics.roic,
        formula: '(EBIT × (1 - Taxa IR) / (Dívida Líquida + PL)) × 100',
        description: 'Mede o retorno gerado pelo capital total investido na empresa',
        type: 'percentage',
        metricKey: 'roic',
      },
    ],
  },
  {
    title: 'Endividamento',
    metrics: [
      {
        title: 'Dívida Líquida/EBITDA',
        ...metrics.dividaLiquidaEbitda,
        formula: 'Dívida Líquida / EBITDA',
        description: 'Indica quantos anos de geração de caixa seriam necessários para pagar a dívida líquida',
        type: 'ratio',
        metricKey: 'dividaLiquidaEbitda',
      },
    ],
  },
  {
    title: 'Dividendos',
    metrics: [
      {
        title: 'Rendimento de Dividendos',
        ...metrics.dividendYield,
        formula: '(Dividendos / Market Cap) × 100',
        description: 'Percentual de retorno em dividendos em relação ao preço da ação',
        type: 'percentage',
        metricKey: 'dividendos',
      },
      {
        title: 'Índice de Distribuição',
        ...metrics.payoutRatio,
        formula: '(Dividendos Pagos / Lucro Líquido) × 100',
        description: 'Percentual do lucro líquido distribuído como dividendos',
        type: 'percentage',
        metricKey: 'distribuicaoLucro',
      },
    ],
  },
]
