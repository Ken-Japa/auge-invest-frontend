import { Metadata } from 'next'

import Ambassadors from '@/pagesComponents/Nao-Logado/Embaixadores'

export const metadata: Metadata = {
  title: 'Programa de Embaixadores | Auge Invest',
  description:
    'Junte-se ao Programa de Embaixadores da Auge Invest. Uma comunidade exclusiva de investidores que compartilham conhecimento e experiências no mercado financeiro.',
  openGraph: {
    title: 'Programa de Embaixadores | Auge Invest',
    description:
      'Faça parte da nossa comunidade exclusiva de embaixadores. Benefícios únicos, networking e oportunidades especiais para membros.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://augeinvest.com.br/embaixadores',
    siteName: 'Auge Invest',
    images: [
      {
        url: '/assets/images/background/Embaixadores.webp',
        width: 1472,
        height: 832,
        alt: 'Programa de Embaixadores Auge Invest',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programa de Embaixadores | Auge Invest',
    description: 'Faça parte da nossa comunidade exclusiva de embaixadores.',
    images: ['/assets/images/background/Contato.webp'],
  },
  keywords: [
    'programa de embaixadores',
    'comunidade de investidores',
    'auge invest',
    'investimentos',
    'benefícios exclusivos',
    'networking financeiro',
    'comunidade trading',
    'embaixadores mercado financeiro',
  ].join(', '),
  alternates: {
    canonical: 'https://augeinvest.com.br/embaixadores',
    languages: {
      'pt-BR': 'https://augeinvest.com.br/embaixadores',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function AmbassadorsPage() {
  return <Ambassadors />
}
