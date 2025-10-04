'use client'

import { type FC, lazy } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'

const LazyFIIDetails = lazy(() => import('../components/FIIs'))

const FIIPg: FC = () => {
  return (
    <PageTransition>
      <ErrorBoundary>
        <PageBackground imageName="FII">
          <SuspenseWrapper fallback={<div>Carregando...</div>}>
            <LazyFIIDetails viewMode="card" defaultPageSize={50} />
          </SuspenseWrapper>
        </PageBackground>
      </ErrorBoundary>
    </PageTransition>
  )
}

export default FIIPg
