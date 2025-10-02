import { Skeleton, Stack } from '@mui/material'
import { type FC } from 'react'

import { visitorColors } from '@/theme/palette/visitor'

import { CardContainer } from './styled'

const SKELETON_STYLES = {
  bgcolor: visitorColors.skeletonBackground,
} as const

const SKELETON_DIMENSIONS = {
  avatar: { width: 120, height: 120 },
  name: { width: 150, height: 30 },
  role: { width: 120, height: 24 },
  testimonial: { width: '100%', height: 80 },
} as const

export const AmbassadorCardSkeleton: FC = () => (
  <CardContainer>
    <Stack spacing={3} alignItems="center" textAlign="center">
      <Skeleton
        variant="circular"
        width={SKELETON_DIMENSIONS.avatar.width}
        height={SKELETON_DIMENSIONS.avatar.height}
        sx={SKELETON_STYLES}
      />
      <Stack spacing={1} width="100%" alignItems="center">
        <Skeleton
          variant="text"
          width={SKELETON_DIMENSIONS.name.width}
          height={SKELETON_DIMENSIONS.name.height}
          sx={SKELETON_STYLES}
        />
        <Skeleton
          variant="text"
          width={SKELETON_DIMENSIONS.role.width}
          height={SKELETON_DIMENSIONS.role.height}
          sx={SKELETON_STYLES}
        />
      </Stack>
      <Skeleton
        variant="text"
        width={SKELETON_DIMENSIONS.testimonial.width}
        height={SKELETON_DIMENSIONS.testimonial.height}
        sx={SKELETON_STYLES}
      />
    </Stack>
  </CardContainer>
)
