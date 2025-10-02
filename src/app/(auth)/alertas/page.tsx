import { Metadata } from 'next'

import { Alertas } from '@/pagesComponents/Logado/Alertas'

export const metadata: Metadata = {
  title: 'Alertas | AugeInvest',
  description:
    'Configure e gerencie alertas personalizados para suas oportunidades de investimento. Acompanhe preços, tendências e receba notificações em tempo real.',
  openGraph: {
    title: 'Alertas de Investimentos | AugeInvest',
    description:
      'Configure alertas personalizados para suas oportunidades de investimento e receba notificações em tempo real.',
    type: 'website',
    siteName: 'AugeInvest',
  },
  keywords:
    'alertas investimentos, notificações mercado financeiro, monitoramento preços, alertas tempo real, auge invest alertas',
  robots: 'index, follow',
}

export default function AlertasPage() {
  return <Alertas />
}
