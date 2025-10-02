import { Box, Skeleton } from '@mui/material'

import { CardContainer } from '@/components/Data-Display/Card/BlogCard/styled'

export const BlogCardSkeleton = () => {
  return (
    <CardContainer>
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" width="70%" height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        <Skeleton variant="text" width="100%" height={60} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width={100} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="text" width={100} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
      </Box>
    </CardContainer>
  )
}
