import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton'
import ETF from '../../../components/ETF'
import ETFSearchBar from '../../../components/ETF/components/SearchBar'

import { BdrContainer, ContentBox, ControlsWrapper, Title } from './styled'

export const Etf = () => {
  return (
    <ErrorBoundary>
      <SuspenseWrapper fallback={<ContentSkeleton height={400} />}>
        <BdrContainer>
          <ControlsWrapper>
            <Title>ETFs</Title>
            <ETFSearchBar />
          </ControlsWrapper>
          <ContentBox>
            <ETF defaultPageSize={20} />
          </ContentBox>
        </BdrContainer>
      </SuspenseWrapper>
    </ErrorBoundary>
  )
}
