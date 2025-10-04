'use client'

import { type FC, lazy } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'

const LazyBDRDetails = lazy(() => import('@/pagesComponents/Logado/components/BDR'))

const BDR: FC = () => {
  return (
    <PageTransition>
      <ErrorBoundary>
        <PageBackground imageName="BDRs">
          <SuspenseWrapper fallback={<div>Carregando...</div>}>
            <LazyBDRDetails viewMode="card" defaultPageSize={50} />
          </SuspenseWrapper>
        </PageBackground>
      </ErrorBoundary>
    </PageTransition>
  )
}

export default BDR
