import HistoryIcon from "@mui/icons-material/History";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";

export const tools = [
  {
    name: "Histórico de Derivativos",
    description:
      "Permite consultar derivativos vencidos para analisar rendimentos de rolagens e estratégias.",
    icon: HistoryIcon,
  },
  {
    name: "Informações de Debêntures",
    description: "Adicione e consulte informações detalhadas sobre debêntures.",
    icon: AccountBalanceIcon,
  },
  {
    name: "Informações de Commodities e Moedas",
    description: "Acompanhe dados e análises de commodities e moedas.",
    icon: AttachMoneyIcon,
  },
  {
    name: "Dados de Selic e Inflação",
    description: "Acesse dados históricos e projeções para Selic e inflação.",
    icon: TrendingUpIcon,
  },
  {
    name: "Tesouro Direto",
    description: "Gerencie e analise seus investimentos no Tesouro Direto.",
    icon: SavingsIcon,
  },
];
