'use client'
import { useRouter } from 'next/navigation'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'

import { ErrorState } from './components/ErrorState'
import { FIIContent } from './components/FIIContent'
import { LoadingState } from './components/LoadingState'
import { NotFoundState } from './components/NotFoundState'
import { useFIIDetails } from './hooks/useFIIDetails'
import { ContentWrapper, DetailPageContainer } from './styled'

interface FIIDetailsProps {
  slug: string
  codigo?: string
  isCode?: boolean
}

const FIIDetails = ({ slug, codigo, isCode = false }: FIIDetailsProps) => {
  const router = useRouter()
  const { fii, loading, error } = useFIIDetails({ slug, codigo, isCode })

  const handleBack = () => {
    router.back()
  }

  return (
    <PageTransition direction="up" duration={0.4} distance={30}>
      <PageBackground imageName="FII-Detalhes">
        <ErrorBoundary>
          <SuspenseWrapper>
            <DetailPageContainer>
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState error={error} onBack={handleBack} />
              ) : !fii ? (
                <NotFoundState onBack={handleBack} />
              ) : (
                <ContentWrapper>
                  <FIIContent fii={fii} />
                </ContentWrapper>
              )}
            </DetailPageContainer>
          </SuspenseWrapper>
        </ErrorBoundary>
      </PageBackground>
    </PageTransition>
  )
}

export default FIIDetails
