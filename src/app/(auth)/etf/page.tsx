import { Metadata } from "next";
import ETF from "@/pagesComponents/Logado/ETF";

export const metadata: Metadata = {
    title: "ETFs | AugeInvest",
    description: "Explore informações detalhadas sobre Exchange Traded Funds (ETFs). Acesse dados de rendimentos, patrimônio, cotações e análises dos principais ETFs do mercado brasileiro.",
    openGraph: {
        title: 'Análise de ETFs | AugeInvest',
        description: 'Dados completos e análises de ETFs para investidores. Tome decisões de investimento informadas com a plataforma AugeInvest.',
        type: 'website',
        siteName: 'AugeInvest',
    },
    keywords: 'ETFs, investimento em ETFs, fundos de índice, rendimentos ETF, dividendos ETF, análise ETF, mercado financeiro',
    robots: 'index, follow',
};

export default function ETFPage() {
    return <ETF />;
}