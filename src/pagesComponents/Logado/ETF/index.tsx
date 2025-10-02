'use client'

import { type FC, lazy } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'

const LazyETFDetails = lazy(() => import('../components/ETF'))

const ETFPage: FC = () => {
  return (
    <PageTransition>
      <ErrorBoundary>
        <PageBackground imageName="ETFs">
          <SuspenseWrapper fallback={<div>Carregando...</div>}>
            <LazyETFDetails defaultPageSize={50} />
          </SuspenseWrapper>
        </PageBackground>
      </ErrorBoundary>
    </PageTransition>
  )
}

export default ETFPage
