import { type FC } from 'react'

import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { type Ambassador } from '../../types'
import { AmbassadorCard } from '../AmbassadorCard'

import { GridContainer } from './styled'

interface AmbassadorsGridProps {
  ambassadors: Ambassador[]
  isLoading: boolean
}

export const AmbassadorsGrid: FC<AmbassadorsGridProps> = ({ ambassadors, isLoading }) => (
  <GridContainer>
    {ambassadors.map((ambassador, index) => (
      <ProgressiveLoad key={index} rootMargin="100px">
        <SuspenseWrapper>
          <AmbassadorCard {...ambassador} index={index} isLoading={isLoading} />
        </SuspenseWrapper>
      </ProgressiveLoad>
    ))}
  </GridContainer>
)
