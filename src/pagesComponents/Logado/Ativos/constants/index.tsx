import ApartmentIcon from '@mui/icons-material/Apartment';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


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
        description: "Brazilian Deposit Receipts, dividendos e mais.",
        icon: ApartmentIcon,
        path: "/bdr",
        available: true
    },
    {
        id: "etf",
        title: "ETF",
        description: "Exchangable Trade Funds",
        icon: ApartmentIcon,
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