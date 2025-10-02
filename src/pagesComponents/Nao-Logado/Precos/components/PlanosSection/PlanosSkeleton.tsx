import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { visitorColors } from '@/theme/palette/visitor'

import { BaseSection, ContentWrapper } from '../../styled'

import { PlanosGrid } from './styled'

export const PlanosSkeleton = () => (
  <BaseSection>
    <ContentWrapper spacing={6}>
      <ContentSkeleton
        type="text"
        textLines={1}
        className={`w-64 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
      />
      <PlanosGrid>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <ContentSkeleton
              key={`plano-${index}`}
              type="card"
              cardHeight={300}
              className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
            />
          ))}
      </PlanosGrid>
    </ContentWrapper>
  </BaseSection>
)
