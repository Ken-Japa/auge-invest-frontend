'use client'

import { lazy } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

const LazyFIIDetails = lazy(() => import('@/pagesComponents/Logado/components/FIIs'))

import { ContentBox, FiiContainer } from './styled'

export const Fii = () => {
  return (
    <ErrorBoundary>
      <SuspenseWrapper fallback={<ContentSkeleton height={400} />}>
        <FiiContainer>
          <ContentBox>
            <LazyFIIDetails viewMode="card" defaultPageSize={20} />
          </ContentBox>
        </FiiContainer>
      </SuspenseWrapper>
    </ErrorBoundary>
  )
}
