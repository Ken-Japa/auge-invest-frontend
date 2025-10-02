import { Metadata } from 'next'

import { Pricing } from '@/pagesComponents/Nao-Logado/Precos'

export const metadata: Metadata = {
  title: 'Planos e Preços | Auge Invest',
  description:
    'Conheça nossos planos e escolha o ideal para você. Preços competitivos, recursos exclusivos e suporte especializado para maximizar seus investimentos.',
  openGraph: {
    title: 'Planos e Preços | Auge Invest',
    description: 'Invista no seu sucesso financeiro com nossos planos personalizados',
    images: [
      {
        url: '/assets/images/background/Precos.webp',
        width: 1368,
        height: 768,
        alt: 'Planos Auge Invest',
      },
    ],
  },
  keywords: 'planos, preços, assinatura, investimentos, análise financeira, mercado financeiro',
  alternates: {
    canonical: 'https://augeinvest.com.br/precos',
  },
}
export default function PricingPage() {
  return <Pricing />
}
