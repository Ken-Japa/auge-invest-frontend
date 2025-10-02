import { Stack } from '@mui/material'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

export const PlansSkeleton = () => {
  return (
    <Stack direction="column" alignItems="center" width="100%" gap="30px">
      <Stack
        width="100%"
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-around"
        alignItems="center"
        spacing={{ xs: 3, md: 2 }}
      >
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <ContentSkeleton
              key={index}
              type="card"
              cardHeight={400}
              className="bg-[#ffffff0a] backdrop-blur-sm flex-1"
            />
          ))}
      </Stack>
    </Stack>
  )
}
