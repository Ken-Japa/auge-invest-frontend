import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { BaseSection, ContentContainer, SectionTitle } from '../../styled'

export const EquipeSkeleton = () => (
  <BaseSection>
    <SectionTitle>
      <ContentSkeleton
        type="text"
        textLines={1}
        className="w-48 bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '48px' }}
      />
    </SectionTitle>
    <ContentSkeleton
      type="text"
      textLines={1}
      className="w-64 mb-8 bg-[#ffffff0a] backdrop-blur-sm"
      style={{ minHeight: '24px' }}
    />
    <ContentContainer>
      <ContentSkeleton
        type="text"
        textLines={3}
        className="bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '100px' }}
      />
    </ContentContainer>
  </BaseSection>
)
