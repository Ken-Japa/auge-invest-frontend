import { Metadata } from 'next'

import { Home } from '@/pagesComponents/Nao-Logado/Home'

export const metadata: Metadata = {
  title: 'Auge Invest | Plataforma de Análise de Investimentos',
  description:
    'Transforme sua experiência de investimento com a Auge Invest. Análises precisas, ferramentas avançadas e suporte especializado para suas decisões financeiras.',
  openGraph: {
    title: 'Auge Invest | Análise de Investimentos',
    description: 'Análises precisas e ferramentas avançadas para otimizar seus investimentos.',
    url: 'https://augeinvest.com.br',
    images: [
      {
        url: '/assets/images/logo/OgCard.png',
        width: 1536,
        height: 1024,
      },
    ],
  },
}

export default function HomePage() {
  return <Home />
}
