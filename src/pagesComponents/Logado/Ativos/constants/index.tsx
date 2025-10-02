import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import PublicIcon from '@mui/icons-material/Public'
import ShowChartIcon from '@mui/icons-material/ShowChart'

export const ativosList = [
  {
    id: 'empresas',
    title: 'Empresas',
    description: 'Análise de ações, derivativos, dividendos, histograma e indicadores técnicos.',
    icon: ShowChartIcon,
    path: '/empresa',
    available: true,
  },
  {
    id: 'fii',
    title: 'Fundos Imobiliários',
    description: 'Explore fundos imobiliários, análise de rendimentos, dividendos e mais.',
    icon: ApartmentIcon,
    path: '/fii',
    available: true,
  },
  {
    id: 'bdr',
    title: 'BDR',
    description: 'Recebíveis de Depósito Brasileiros - Acompanhe ações internacionais negociadas no Brasil.',
    icon: CurrencyExchangeIcon,
    path: '/bdr',
    available: true,
  },
  {
    id: 'etf',
    title: 'ETF',
    description: 'Fundos de Índice - Invista em cestas de ativos que replicam índices de mercado.',
    icon: CandlestickChartIcon,
    path: '/etf',
    available: true,
  },
  {
    id: 'etf-bdr',
    title: 'ETF de BDR',
    description: 'Explore ETFs de BDRs e invista em empresas estrangeiras através da bolsa brasileira.',
    icon: PublicIcon,
    path: '/etfbdr',
    available: true,
  },
  {
    id: 'tesouro',
    title: 'Tesouro Direto',
    description: 'Acompanhe títulos públicos, simulações de rentabilidade e comparativos.',
    icon: AccountBalanceIcon,
    path: '/tesouro',
    available: false,
  },
]
