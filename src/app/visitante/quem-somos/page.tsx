import { Metadata } from 'next'

import AboutPage from '@/pagesComponents/Nao-Logado/Quem-somos'

export const metadata: Metadata = {
  title: 'Quem Somos | Auge Invest',
  description:
    'Conheça a Auge Invest: uma empresa inovadora focada em transformar o mercado financeiro através de tecnologia avançada e análises precisas. Nossa missão é democratizar o acesso a investimentos inteligentes.',
  openGraph: {
    title: 'Quem Somos | Auge Invest',
    description: 'Conheça nossa história e missão no mercado financeiro',
    images: [
      {
        url: '/assets/images/background/Quem-Somos.webp',
        width: 1120,
        height: 1120,
        alt: 'Sobre a Auge Invest',
      },
    ],
  },
  keywords: 'sobre nós, história, missão, valores, equipe, fintech, investimentos, tecnologia financeira',
  alternates: {
    canonical: 'https://augeinvest.com.br/quem-somos',
  },
}

export default function RegisterPage() {
  return <AboutPage />
}
