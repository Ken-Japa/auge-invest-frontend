import { Metadata } from 'next'

import { FAQ } from '@/pagesComponents/Nao-Logado/FAQ'

export const metadata: Metadata = {
  title: 'FAQ | Auge Invest',
  description:
    'Encontre respostas para as perguntas mais frequentes sobre a Auge Invest. Tire suas dúvidas sobre nossa plataforma, investimentos, segurança e muito mais.',
  openGraph: {
    title: 'Perguntas Frequentes | Auge Invest',
    description: 'Tire suas dúvidas sobre a plataforma Auge Invest',
    images: [
      {
        url: '/assets/images/background/BACKGROUND-DEFAULT.webp',
        width: 1368,
        height: 768,
        alt: 'FAQ Auge Invest',
      },
    ],
  },
  keywords: 'FAQ, dúvidas frequentes, ajuda, suporte, investimentos, plataforma de investimentos',
  alternates: {
    canonical: 'https://augeinvest.com.br/faq',
  },
}
export default function FAQPage() {
  return <FAQ />
}
