'use client'

import { useErrorHandling } from '@/components/Data-Display/ErrorHandling'
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

// Importando componentes do módulo BDR
import FIISearchBar from '../../../components/FIIs/components/SearchBar'
import { FIITabs } from '../../../FII/components/FIITabs'

import { ContentBox, ControlsWrapper, FiiContainer, Title } from './styled'

export const Fii = () => {
  const { error, setError, clearError } = useErrorHandling()

  return (
    <ErrorBoundary>
      <SuspenseWrapper fallback={<ContentSkeleton height={400} />}>
        <FiiContainer>
          <ControlsWrapper>
            <Title>Fundos Imobiliários</Title>
            <FIISearchBar />
          </ControlsWrapper>
          <ContentBox>
            <FIITabs onError={setError} defaultPageSize={20} />
          </ContentBox>
        </FiiContainer>
      </SuspenseWrapper>
    </ErrorBoundary>
  )
}
