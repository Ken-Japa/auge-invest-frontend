import { Stack } from '@mui/material'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

const commonSkeletonProps = {
  type: 'text' as const,
  textLines: 1,
  className: 'h-14 bg-[#ffffff0a] backdrop-blur-sm',
}

export const FormFieldsSkeleton = () => (
  <Stack spacing={2} width="100%">
    <ContentSkeleton {...commonSkeletonProps} />
    <ContentSkeleton {...commonSkeletonProps} />
    <ContentSkeleton {...commonSkeletonProps} />
    <ContentSkeleton {...commonSkeletonProps} />
    <ContentSkeleton {...commonSkeletonProps} />
    <ContentSkeleton {...commonSkeletonProps} />
  </Stack>
)
