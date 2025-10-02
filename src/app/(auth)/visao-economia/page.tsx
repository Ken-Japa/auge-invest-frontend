import { Metadata } from 'next'

import { VisaoEconomia } from '@/pagesComponents/Logado/Visao-Economia'

export const metadata: Metadata = {
  title: 'Visão Geral da Economia | Análise de Mercado | AugeInvest',
  description:
    'Análise completa do cenário econômico atual, indicadores macroeconômicos, tendências de mercado e projeções financeiras. Acompanhe dados em tempo real e tome decisões informadas sobre seus investimentos.',
  openGraph: {
    title: 'Visão Geral da Economia | AugeInvest',
    description:
      'Análise detalhada do cenário econômico, indicadores e tendências de mercado para decisões de investimento mais precisas.',
    type: 'website',
    siteName: 'AugeInvest',
  },
  keywords:
    'análise econômica, visão geral economia, indicadores financeiros, tendências mercado, análise macroeconômica, auge invest economia',
  robots: 'index, follow',
}

export default function VisaoEconomiaPage() {
  return <VisaoEconomia />
}
