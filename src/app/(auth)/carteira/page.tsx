import { Metadata } from "next";
import { Dashboard } from "@/pagesComponents/Logado/Dashboard";


export const metadata: Metadata = {
    title: "Acompanhamento de Carteira | AugeInvest",
    description: "Monitore a evolução da sua carteira de investimentos em tempo real. Acompanhe posições reais e simuladas, análise de performance, indicadores personalizados e histórico completo de suas operações na plataforma AugeInvest.",
    openGraph: {
        title: 'Acompanhamento da Carteira | AugeInvest',
        description: 'Acompanhamento completo da sua carteira: posições reais, simulações, análise de performance e indicadores personalizados.',
        type: 'website',
        siteName: 'AugeInvest',
    },
    keywords: 'dashboard investimentos, acompanhamento carteira, posição real, simulação investimentos, análise performance, portfolio tracking, auge invest dashboard',
    robots: 'index, follow',
};

export default function DashboardPage() {
    return <Dashboard />;
}