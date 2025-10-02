import { Metadata } from 'next'

import { Empresa } from '@/pagesComponents/Logado/Empresa'

export const metadata: Metadata = {
  title: 'Empresas | AugeInvest',
  description:
    'Explore informações detalhadas sobre empresas listadas na bolsa de valores. Acesse dados financeiros, indicadores, histórico e análises das principais empresas do mercado.',
  openGraph: {
    title: 'Análise de Empresas | AugeInvest',
    description:
      'Dados completos e análises de empresas listadas na bolsa. Tome decisões de investimento informadas com a plataforma AugeInvest.',
    type: 'website',
    siteName: 'AugeInvest',
  },
  keywords:
    'empresas bolsa, análise empresas, dados financeiros, indicadores empresas, ações, mercado de capitais, auge invest empresas',
  robots: 'index, follow',
}

export default function PerfilPage() {
  return <Empresa />
}
