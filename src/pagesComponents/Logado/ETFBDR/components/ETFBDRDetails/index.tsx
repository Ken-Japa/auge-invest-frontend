'use client'
import { useRouter } from 'next/navigation'
import React, { lazy } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'

const LazyETFBDRDetailsContent = lazy(() =>
  import('./ETFBDRDetailsContent').then((mod) => ({ default: mod.ETFBDRDetailsContent })),
)
import { useETFBDRDetails } from './hooks/useETFBDRDetails'
import { DetailPageContainer } from './styled'
import { ETFBDRLoadingState } from './utils/ETFBDRLoadingState'
import { ETFBDRNotFoundState } from './utils/ETFBDRNotFoundState'

interface ETFBDRDetailsProps {
  slug: string
  codigo?: string
  isCode?: boolean
}

const ETFDetails = ({ slug, codigo, isCode = false }: ETFBDRDetailsProps) => {
  const router = useRouter()
  const { etf, loading, error } = useETFBDRDetails({ slug, codigo, isCode })

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return <ETFBDRLoadingState />
  }

  if (error) {
    return <ETFBDRNotFoundState message={error} onBack={handleBack} />
  }

  if (!etf) {
    return <ETFBDRNotFoundState message="ETF não encontrado." onBack={handleBack} />
  }

  return (
    <PageTransition>
      <ErrorBoundary>
        <PageBackground imageName="ETFs">
          <SuspenseWrapper fallback={<div>Carregando...</div>}>
            <DetailPageContainer>
              <LazyETFBDRDetailsContent etf={etf} onBack={handleBack} />
            </DetailPageContainer>
          </SuspenseWrapper>
        </PageBackground>
      </ErrorBoundary>
    </PageTransition>
  )
}

export default ETFDetails
