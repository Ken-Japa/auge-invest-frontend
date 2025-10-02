import { Stack } from '@mui/material'
import { type FC } from 'react'

import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { type Ambassador } from '../../types'
import { AmbassadorsGrid } from '../AmbassadorsGrid'
import { ContentWrapper, StyledContainer } from './styled'

interface MainContentProps {
  isLoading: boolean
  ambassadors: Ambassador[]
  Header: React.LazyExoticComponent<FC<{ isLoading?: boolean }>>
  CallToAction: React.LazyExoticComponent<FC<{ isLoading?: boolean }>>
}

export const MainContent: FC<MainContentProps> = ({ isLoading, ambassadors, Header, CallToAction }) => (
  <ContentWrapper>
    <StyledContainer>
      <Stack spacing={8} alignItems="center">
        <SuspenseWrapper>
          <Header isLoading={isLoading} />
        </SuspenseWrapper>

        <AmbassadorsGrid ambassadors={ambassadors} isLoading={isLoading} />

        <ProgressiveLoad>
          <SuspenseWrapper>
            <CallToAction isLoading={isLoading} />
          </SuspenseWrapper>
        </ProgressiveLoad>
      </Stack>
    </StyledContainer>
  </ContentWrapper>
)

export default MainContent
