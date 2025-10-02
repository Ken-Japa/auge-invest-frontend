import { Metadata } from 'next'

import { AtivosPage } from '@/pagesComponents/Logado/Ativos'

export const metadata: Metadata = {
  title: 'Ativos | AugeInvest',
  description:
    'Explore diferentes classes de ativos financeiros como Fundos Imobiliários, Ações, Tesouro Direto entre outros. Análises, comparativos e ferramentas para otimizar seus investimentos.',
  openGraph: {
    title: 'Ativos Financeiros | AugeInvest',
    description:
      'Explore diferentes classes de ativos financeiros e encontre as melhores oportunidades de investimento com análises detalhadas e ferramentas exclusivas.',
    type: 'website',
    siteName: 'AugeInvest',
  },
  keywords:
    'ativos financeiros, fundos imobiliários, ações, tesouro direto, investimentos, análise de ativos, auge invest',
  robots: 'index, follow',
}

export default function Ativos() {
  return <AtivosPage />
}
