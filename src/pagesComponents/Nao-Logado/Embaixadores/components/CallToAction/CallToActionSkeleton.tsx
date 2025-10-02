import { type FC } from 'react'

import { CallToActionContainer, ContentStack, StyledSkeleton } from './styled'

const SKELETON_DIMENSIONS = {
  title: { width: 200, height: 24 },
  subtitle: { width: 300, height: 32 },
  button: { width: 200, height: 40, borderRadius: 1 },
} as const

export const CallToActionSkeleton: FC = () => (
  <CallToActionContainer>
    <ContentStack spacing={3} alignItems="center">
      <StyledSkeleton
        variant="text"
        width={SKELETON_DIMENSIONS.title.width}
        height={SKELETON_DIMENSIONS.title.height}
      />
      <StyledSkeleton
        variant="text"
        width={SKELETON_DIMENSIONS.subtitle.width}
        height={SKELETON_DIMENSIONS.subtitle.height}
      />
      <StyledSkeleton
        variant="rectangular"
        width={SKELETON_DIMENSIONS.button.width}
        height={SKELETON_DIMENSIONS.button.height}
        sx={{ borderRadius: SKELETON_DIMENSIONS.button.borderRadius }}
      />
    </ContentStack>
  </CallToActionContainer>
)
