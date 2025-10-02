import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { BaseSection, ContentContainer, SectionTitle, Subtitle } from '../../styled'

export const MissaoSkeleton = () => (
  <BaseSection>
    <SectionTitle>
      <ContentSkeleton
        type="text"
        textLines={1}
        className="w-64 bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '48px' }}
      />
    </SectionTitle>
    <Subtitle>
      <ContentSkeleton
        type="text"
        textLines={1}
        className="w-48 bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '24px' }}
      />
    </Subtitle>
    <ContentContainer>
      <ContentSkeleton
        type="text"
        textLines={5}
        className="bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '180px' }}
      />
    </ContentContainer>
  </BaseSection>
)
