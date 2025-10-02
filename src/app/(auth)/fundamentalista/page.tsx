import { Metadata } from 'next'

import { AnaliseFundamentalista } from '@/pagesComponents/Logado/Analise Fundamentalista'

export const metadata: Metadata = {
  title: 'Análise Fundamentalista | AugeInvest',
  description:
    'Explore as principais métricas da análise fundamentalista para tomar decisões de investimento mais informadas. Avalie a saúde financeira de empresas e identifique oportunidades com a AugeInvest.',
  openGraph: {
    title: 'Análise Fundamentalista | AugeInvest',
    description:
      'Explore as principais métricas da análise fundamentalista para tomar decisões de investimento mais informadas.',
    type: 'website',
    siteName: 'AugeInvest',
  },
  keywords: 'auge invest',
  robots: 'index, follow',
}

export default function AnaliseFundamentalistaPage() {
  return <AnaliseFundamentalista />
}
