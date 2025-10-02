'use client'
import { useRouter } from 'next/navigation'
import React, { lazy, Suspense } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'

const LazyBDRContent = lazy(() =>
  import('./components/BDRContent').then((mod) => ({ default: mod.BDRContent })),
)
import { ErrorState } from './components/ErrorState'
import { LoadingState } from './components/LoadingState'
import { NotFoundState } from './components/NotFoundState'
import { useBDRDetails } from './hooks/useBDRDetails'
import { ContentWrapper, DetailPageContainer } from './styled'

interface BDRDetailsProps {
  slug: string
  codigo?: string
  isCode?: boolean
}

const BDRDetails = ({ slug, codigo, isCode = false }: BDRDetailsProps) => {
  const router = useRouter()
  const { bdr, loading, error } = useBDRDetails({ slug, codigo, isCode })

  const handleBack = () => {
    router.back()
  }

  return (
    <PageTransition direction="up" duration={0.4} distance={30}>
      <PageBackground imageName="BDR">
        <ErrorBoundary>
          <SuspenseWrapper>
            <DetailPageContainer>
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState error={error} onBack={handleBack} />
              ) : !bdr ? (
                <NotFoundState onBack={handleBack} />
              ) : (
                <ContentWrapper>
                  <Suspense fallback={<div>Carregando detalhes do BDR...</div>}>
                    <LazyBDRContent bdr={bdr} />
                  </Suspense>
                </ContentWrapper>
              )}
            </DetailPageContainer>
          </SuspenseWrapper>
        </ErrorBoundary>
      </PageBackground>
    </PageTransition>
  )
}

export default BDRDetails
