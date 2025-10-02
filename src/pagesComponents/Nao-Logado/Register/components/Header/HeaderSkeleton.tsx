import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { HeaderContainer } from './styled'

const skeletonProps = {
  type: 'text' as const,
  textLines: 1,
  className: 'matrix-title bg-[#ffffff0a] backdrop-blur-sm',
}

export const HeaderSkeleton = () => (
  <HeaderContainer>
    <ContentSkeleton {...skeletonProps} />
  </HeaderContainer>
)
