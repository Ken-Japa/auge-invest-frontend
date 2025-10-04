import { lazy } from 'react'
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton'

import { BdrContainer, ContentBox } from './styled'

const LazyETFDetails = lazy(() => import('@/pagesComponents/Logado/components/ETF'))

export const Etf = () => {
  return (
    <ErrorBoundary>
      <SuspenseWrapper fallback={<ContentSkeleton height={400} />}>
        <BdrContainer>
          <ContentBox>
            <LazyETFDetails viewMode="grid" defaultPageSize={20} />
          </ContentBox>
        </BdrContainer>
      </SuspenseWrapper>
    </ErrorBoundary>
  )
}
