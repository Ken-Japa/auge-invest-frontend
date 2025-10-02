import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { visitorColors } from '@/theme/palette/visitor'

import { BaseSection, ContentWrapper } from '../../styled'

import { VantagensGrid } from './styled'

export const VantagensSkeleton = () => (
  <BaseSection>
    <ContentWrapper spacing={6}>
      <ContentSkeleton
        type="text"
        textLines={1}
        className={`w-64 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
      />
      <VantagensGrid>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <ContentSkeleton
              key={`vantagem-${index}`}
              type="card"
              cardHeight={150}
              className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
            />
          ))}
      </VantagensGrid>
    </ContentWrapper>
  </BaseSection>
)
