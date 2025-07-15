import ApartmentIcon from '@mui/icons-material/Apartment';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';

export const ativosList = [
    {
        id: "empresas",
        title: "Empresas",
        description: "Análise de ações, derivativos, dividendos, histograma e indicadores técnicos.",
        icon: ShowChartIcon,
        path: "/empresa",
        available: true
    },
    {
        id: "fii",
        title: "Fundos Imobiliários",
        description: "Explore fundos imobiliários, análise de rendimentos, dividendos e mais.",
        icon: ApartmentIcon,
        path: "/fii",
        available: true
    },
    {
        id: "bdr",
        title: "BDR",
        description: "Recebíveis de Depósito Brasileiros - Acompanhe ações internacionais negociadas no Brasil.",
        icon: CurrencyExchangeIcon,
        path: "/bdr",
        available: true
    },
    {
        id: "etf",
        title: "ETF",
        description: "Fundos de Índice - Invista em cestas de ativos que replicam índices de mercado.",
        icon: CandlestickChartIcon,
        path: "/etf",
        available: true
    },
    {
        id: "tesouro",
        title: "Tesouro Direto",
        description: "Acompanhe títulos públicos, simulações de rentabilidade e comparativos.",
        icon: AccountBalanceIcon,
        path: "/tesouro",
        available: false
    },

];