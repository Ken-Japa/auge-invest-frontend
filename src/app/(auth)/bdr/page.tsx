import { Metadata } from "next";

import { BDR } from "@/pagesComponents/Logado/BDR";

export const metadata: Metadata = {
    title: "BDRs | AugeInvest",
    description: "Todas as informações sobre Recebíveis de Depósito Brasileiro (BDRs) em um só lugar. Acompanhe cotações, dividendos, histórico de rendimentos, análises dos principais BDRs negociados no Brasil.",
    openGraph: {
        title: 'Análise de BDRs | AugeInvest',
        description: 'Plataforma completa para análise de BDRs. Compare desempenho, receba alertas e tome decisões de investimento baseadas em dados com a AugeInvest.',
        type: 'website',
        siteName: 'AugeInvest',
    },
    keywords: 'BDR, Recebíveis de Depósito Brasileiro, Brazilian Deposit Receipt, BDRs brasileiros, análise BDR, dividendos BDR, investimento em ações internacionais, cotações BDR, rendimentos BDR, mercado financeiro',
    robots: 'index, follow',
};

export default function BDRPage() {
    return <BDR />;
}