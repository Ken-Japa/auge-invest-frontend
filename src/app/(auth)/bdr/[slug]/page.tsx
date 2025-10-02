import { Metadata } from 'next'

import BDRDetails from '@/pagesComponents/Logado/BDR/components/BDRDetalhes'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const awaitedParams = await params
  const decodedSlug = decodeURIComponent(awaitedParams.slug).toUpperCase()
  return {
    title: `${decodedSlug} | AugeInvest`,
    description: `Análise detalhada do BDR ${decodedSlug}, incluindo dividendos, patrimônio e métricas principais.`,
  }
}

export default async function FIIPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params
  const decodedSlug = decodeURIComponent(awaitedParams.slug)
  return <BDRDetails slug={decodedSlug} />
}
