import HandymanIcon from '@mui/icons-material/Handyman';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UpdateIcon from '@mui/icons-material/Update';

import { visitorColors } from "@/theme/palette/visitor";

const ICON_STYLE = {
  fontSize: 40,
  color: visitorColors.primary
};

export const FEATURES = [
    {
        icon: <QueryStatsIcon sx={ICON_STYLE} />,
        title: "Análise Avançada",
        description: "Ferramentas poderosas de análise técnica e fundamentalista para tomada de decisões mais precisas.",
        details: ["Indicadores técnicos personalizáveis", "Análise fundamentalista detalhada", "Gráficos interativos"]
    },
    {
        icon: <NotificationsActiveIcon sx={ICON_STYLE} />,
        title: "Alertas em Tempo Real",
        description: "Receba notificações instantâneas sobre movimentações importantes do mercado e oportunidades de investimento.",
        details: ["Alertas personalizados", "Notificações push", "Monitoramento 24/7"]
    },
    {
        icon: <HistoryIcon sx={ICON_STYLE} />,
        title: "Histórico Detalhado",
        description: "Acesso a dados históricos completos para análise de tendências e padrões de mercado.",
        details: ["Dados históricos completos", "Análise de tendências", "Histórico de derivativos"]
    },
    {
        icon: <TrendingUpIcon sx={ICON_STYLE} />,
        title: "Acompanhamento de Performance",
        description: "Monitore o desempenho de seus investimentos com gráficos e relatórios personalizados.",
        details: ["Posições reais e fictícias", "Métricas de performance", "Dashboard personalizado"]
    },
    {
        icon: <HandymanIcon sx={ICON_STYLE} />,
        title: "Ferramentas exclusivas",
        description: "Otimize seus investimentos com ferramentas exclusivas",
        details: ["Dashboard com visão geral da economia", "Histograma definindo oportunidades", "Plataforma disponível para celulares"]
    },
    {
        icon: <SecurityIcon sx={ICON_STYLE} />,
        title: "Segurança Avançada",
        description: "Proteção de dados de última geração para garantir a segurança de suas informações.",
        details: ["Criptografia de ponta", "Autenticação em 2 fatores", "Backup automático"]
    },
    {
        icon: <UpdateIcon sx={ICON_STYLE} />,
        title: "Atualizações Constantes",
        description: "Plataforma em constante evolução com novas funcionalidades e melhorias.",
        details: ["Atualizações regulares", "Novas funcionalidades", "Melhorias contínuas"]
    },
    {
        icon: <SupportAgentIcon sx={ICON_STYLE} />,
        title: "Suporte Especializado",
        description: "Equipe de suporte técnico disponível para auxiliar em suas dúvidas e necessidades.",
        details: ["Canais de comunicação", "Especialistas disponíveis", "Atendimento rápido"]
    }
] as const;