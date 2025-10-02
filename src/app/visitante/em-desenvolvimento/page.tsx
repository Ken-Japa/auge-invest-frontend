import { Metadata } from 'next'

import { Desenvolvimento } from '@/pagesComponents/Nao-Logado/Desenvolvimento'

export const metadata: Metadata = {
  title: 'Em Desenvolvimento | Auge Invest',
  description:
    'Novas ferramentas em desenvolvimento para aprimorar nossa plataforma e ajudar ainda mais o investidor em sua tomada de decisão',
  openGraph: {
    title: 'Em Desenvolvimento | Auge Invest',
    description: 'Ferramentas em desenvolvimento',
    images: [
      {
        url: '/assets/images/background/Contato.webp',
        width: 1120,
        height: 1120,
        alt: 'Desenvolvimento Auge Invest',
      },
    ],
  },
  keywords: 'ferramentas, em desenvolvimento, AugeInvest, melhoria contínua, mercado financeiro',
  alternates: {
    canonical: 'https://augeinvest.com.br/em-desenvolvimento',
  },
}

export default function DesenvolvimentoPage() {
  return <Desenvolvimento />
}
