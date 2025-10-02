import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { SectionContainer } from './styled'

export const PrivacySectionSkeleton = () => {
  return (
    <SectionContainer>
      <ContentSkeleton type="text" textLines={1} className="w-64 mb-4 bg-[#ffffff0a] backdrop-blur-sm" />
      <ContentSkeleton type="text" textLines={4} className="bg-[#ffffff0a] backdrop-blur-sm" />
    </SectionContainer>
  )
}
