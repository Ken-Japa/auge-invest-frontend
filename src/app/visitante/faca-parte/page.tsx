import { Metadata } from 'next'

import { JoinTeam } from '@/pagesComponents/Nao-Logado/Faca-parte'

export const metadata: Metadata = {
  title: 'Junte-se a nós | Auge Invest',
  description:
    'Faça parte do time da Auge Invest. Procuramos talentos apaixonados por tecnologia e mercado financeiro para transformar o futuro dos investimentos.',
  openGraph: {
    title: 'Carreiras na Auge Invest',
    description: 'Junte-se ao nosso time e faça parte da revolução dos investimentos',
    images: [
      {
        url: '/assets/images/background/Faca-Parte.jpg',
        width: 1120,
        height: 1120,
        alt: 'Carreiras Auge Invest',
      },
    ],
  },
  keywords: 'carreiras, vagas, emprego, fintech, tecnologia, investimentos, análise financeira',
  alternates: {
    canonical: 'https://augeinvest.com.br/faca-parte',
  },
}
export default function JoinTeamPage() {
  return <JoinTeam />
}
