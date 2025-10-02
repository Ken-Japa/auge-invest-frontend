import { Stack } from '@mui/material'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

export const QuestionsSkeleton = () => {
  return (
    <Stack spacing={4} alignItems="center">
      <ContentSkeleton type="text" textLines={2} className="p-4 bg-[#ffffff0a] rounded-lg backdrop-blur-sm" />
      <Stack spacing={2} width="100%" maxWidth="800px">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <ContentSkeleton
              key={index}
              type="card"
              cardHeight={80}
              className="bg-[#ffffff0a] backdrop-blur-sm"
            />
          ))}
      </Stack>
    </Stack>
  )
}
