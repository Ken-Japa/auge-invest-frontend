import { Metadata } from "next";

import { ETFBDRPage } from "@/pagesComponents/Logado/ETFBDR";

export const metadata: Metadata = {
  title: "ETFs de BDRs | AugeInvest",
  description: "Explore e compare ETFs de BDRs. Análises detalhadas, desempenho histórico e ferramentas para otimizar seus investimentos em fundos de índice e recibos de depósito.",
  openGraph: {
    title: 'ETFs e BDRs | AugeInvest',
    description: 'Análises completas de ETFs de BDRs para suas decisões de investimento. Compare, analise e invista com inteligência.',
    type: 'website',
    siteName: 'AugeInvest',
  },
  keywords: 'ETFs, BDRs, fundos de índice, recibos de depósito, análise de investimentos, comparativo ETFs BDRs, auge invest',
  robots: 'index, follow',
};

export default function ETFBDR() {
  return <ETFBDRPage />;
}