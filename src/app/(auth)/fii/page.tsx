import { Metadata } from 'next'

import FIIPg from '@/pagesComponents/Logado/FII'

export const metadata: Metadata = {
  title: 'Fundos Imobiliários | AugeInvest',
  description:
    'Explore informações detalhadas sobre Fundos de Investimento Imobiliário (FIIs). Acesse dados de rendimentos, patrimônio, cotações e análises dos principais FIIs do mercado brasileiro.',
  openGraph: {
    title: 'Análise de Fundos Imobiliários | AugeInvest',
    description:
      'Dados completos e análises de FIIs para investidores. Tome decisões de investimento informadas com a plataforma AugeInvest.',
    type: 'website',
    siteName: 'AugeInvest',
  },
  keywords:
    'fundos imobiliários, FIIs, investimento imobiliário, rendimentos FII, dividendos imobiliários, análise FII, mercado imobiliário',
  robots: 'index, follow',
}

export default function FIIPage() {
  return <FIIPg />
}
