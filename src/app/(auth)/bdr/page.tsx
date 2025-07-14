import { Metadata } from "next";
import { BDR } from "@/pagesComponents/Logado/BDR";

export const metadata: Metadata = {
    title: "BDR | AugeInvest",
    description: "Explore informações detalhadas sobre Brazilian Deposit Receipt (BDRs). Acesse dados de rendimentos, patrimônio, cotações e análises dos principais FIIs do mercado brasileiro.",
    openGraph: {
        title: 'Análise de BDR | AugeInvest',
        description: 'Dados completos e análises de BDRs para investidores. Tome decisões de investimento informadas com a plataforma AugeInvest.',
        type: 'website',
        siteName: 'AugeInvest',
    },
    keywords: 'brazilian deposit receipt, BDRs, BDR, rendimentos BDR, dividendos BDR, análise BDR, mercado BDR',
    robots: 'index, follow',
};

export default function BDRPage() {
    return <BDR />;
}