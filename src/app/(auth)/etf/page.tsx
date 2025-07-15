import { Metadata } from "next";
import ETF from "@/pagesComponents/Logado/ETF";

export const metadata: Metadata = {
    title: "ETFs | AugeInvest",
    description: "Informações completas sobre Exchange Traded Funds (ETFs). Compare desempenho, taxas de administração, composição da carteira e receba análises dos principais ETFs do mercado brasileiro.",
    openGraph: {
        title: 'Análise de ETFs | AugeInvest',
        description: 'Tudo sobre ETFs: desempenho histórico, dividend yield, composição da carteira e análises para ajudar você a escolher os melhores fundos de índice.',
        type: 'website',
        siteName: 'AugeInvest',
    },
    keywords: 'ETF, Exchange Traded Fund, fundos de índice, investimento ETF, análise ETF, comparativo ETFs, dividendos ETF, composição de carteira ETF, ETFs brasileiros',
    robots: 'index, follow',
};

export default function ETFPage() {
    return <ETF />;
}