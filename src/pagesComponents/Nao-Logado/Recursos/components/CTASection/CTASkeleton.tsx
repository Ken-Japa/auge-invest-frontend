import { Stack } from '@mui/material'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { CTAContainer } from './styled'

export const CTASkeleton = () => (
  <CTAContainer>
    <Stack spacing={3} alignItems="center">
      <ContentSkeleton
        type="text"
        textLines={1}
        className="w-96 bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '48px' }}
      />
      <ContentSkeleton
        type="text"
        textLines={2}
        className="w-80 bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '24px' }}
      />
      <ContentSkeleton
        type="text"
        textLines={1}
        className="w-64 h-12 mt-4 bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '48px' }}
      />
      <ContentSkeleton
        type="text"
        textLines={1}
        className="w-48 mt-2 bg-[#ffffff0a] backdrop-blur-sm"
        style={{ minHeight: '24px' }}
      />
    </Stack>
  </CTAContainer>
)
