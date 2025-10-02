import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { visitorColors } from '@/theme/palette/visitor'

import { BaseSection, ContentWrapper } from '../../styled'

import { TestimonialsGrid } from './styled'

export const TestimonialsSkeleton = () => (
  <BaseSection>
    <ContentWrapper spacing={4}>
      <ContentSkeleton
        type="text"
        textLines={1}
        className={`w-64 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
      />
      <TestimonialsGrid>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <ContentSkeleton
              key={`testimonial-${index}`}
              type="card"
              cardHeight={200}
              className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
            />
          ))}
      </TestimonialsGrid>
    </ContentWrapper>
  </BaseSection>
)
