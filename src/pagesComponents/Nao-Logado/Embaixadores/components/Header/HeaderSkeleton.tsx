import { type FC } from 'react'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { HeaderContainer } from './styled'

const SKELETON_DIMENSIONS = {
  icon: { width: 60, height: 60 },
  title: { width: 200, height: 60 },
  subtitle: { width: 180, height: 40 },
  description: { width: 500, height: 60 },
} as const

export const HeaderSkeleton: FC = () => (
  <HeaderContainer spacing={3}>
    <ContentSkeleton
      type="avatar"
      width={SKELETON_DIMENSIONS.icon.width}
      height={SKELETON_DIMENSIONS.icon.height}
      className="bg-[#ffffff0a] backdrop-blur-sm"
    />
    <ContentSkeleton
      type="text"
      width={SKELETON_DIMENSIONS.title.width}
      height={SKELETON_DIMENSIONS.title.height}
      className="bg-[#ffffff0a] backdrop-blur-sm"
    />
    <ContentSkeleton
      type="text"
      width={SKELETON_DIMENSIONS.subtitle.width}
      height={SKELETON_DIMENSIONS.subtitle.height}
      className="bg-[#ffffff0a] backdrop-blur-sm"
    />
    <ContentSkeleton
      type="text"
      width={SKELETON_DIMENSIONS.description.width}
      height={SKELETON_DIMENSIONS.description.height}
      className="bg-[#ffffff0a] backdrop-blur-sm"
    />
  </HeaderContainer>
)
