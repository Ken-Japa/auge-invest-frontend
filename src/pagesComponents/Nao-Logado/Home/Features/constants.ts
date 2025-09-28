import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TimelineIcon from '@mui/icons-material/Timeline';

import { visitorColors } from "@/theme/palette/visitor";

export const ICON_STYLES = {
    fontSize: 40,
    color: visitorColors.primary
} as const;

export const FEATURES_DATA = [
    {
        icon: ShowChartIcon,
        title: "Análise Técnica Profissional",
        description: "Gráficos, dados e ferramentas que fundos pagam muito para usar",
        image: "/assets/images/imagens/Analise-Tecnica.jpg",
        highlights: ["Simule estratégias complexas em cenários históricos", "Visualize volatilidade em tempo real com heatmaps interativos", "Histograma: descubra as oportunidades do mercado para comprar e vender"]
    },
    {
        icon: TimelineIcon,
        title: "Fundamentalista Além do Óbvio",
        description: "Dados que você não encontra em nenhuma outra plataforma",
        image: "/assets/images/imagens/Analise-Fundamentalista.jpg",
        highlights: ["Histórico completo de dividendos ajustados por proventos", "Valuation comparativo entre BDRs e ativos internacionais", "Alertas de balanços com insights"]
    },
    {
        icon: NotificationsActiveIcon,
        title: "Alertas Que Geram Lucro",
        description: "Não apenas notificações – gatilhos para ação",
        image: "/assets/images/imagens/Alertas-Inteligentes.jpg",
        highlights: ["👉 PETR4 atingiu faixa de preço barato (5% abaixo da média histórica)", "👉 Vale3: estratégia de trava de alta tem ROI potencial de 11% neste ciclo", "👉 Dólar futuro em zona de risco alto - hora de hedge?"]
    }
] as const;