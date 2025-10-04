'use client'

import { useState, lazy } from 'react'

import { useErrorHandling } from '@/components/Data-Display/ErrorHandling'
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

const LazyBDRDetails = lazy(() => import('@/pagesComponents/Logado/components/BDR'))

import { BdrContainer, ContentBox } from './styled'

export const Bdr = () => {
  const { error, setError, clearError } = useErrorHandling()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('cartao')

  return (
    <ErrorBoundary>
      <SuspenseWrapper fallback={<ContentSkeleton height={400} />}>
        <BdrContainer>
          <ContentBox>
            <LazyBDRDetails viewMode="table" defaultPageSize={20} />
          </ContentBox>
        </BdrContainer>
      </SuspenseWrapper>
    </ErrorBoundary>
  )
}
