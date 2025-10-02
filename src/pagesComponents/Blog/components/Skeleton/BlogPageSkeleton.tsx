import { Box, Container, Grid } from '@mui/material'
import React from 'react'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

interface BlogPageSkeletonProps {
  postsPerPage: number
}

export const BlogPageSkeleton: React.FC<BlogPageSkeletonProps> = ({ postsPerPage }) => {
  return (
    <Box>
      {/* Blog Header Skeleton */}
      <Box
        sx={{
          height: 450,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.200',
        }}
      >
        <ContentSkeleton type="text" width="60%" height={450} />
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Main Content Area Skeleton */}
          <Grid item xs={12} md={8}>
            {/* Blog Search Skeleton */}
            <Box mb={4}>
              <ContentSkeleton type="form" formFields={1} height={56} />
            </Box>

            {/* Blog Card List Skeleton */}
            {Array.from(new Array(postsPerPage + 4)).map((_, index) => (
              <Box key={index} mb={8}>
                <ContentSkeleton type="card" cardHeight={200} />
              </Box>
            ))}

            {/* Pagination Skeleton */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <ContentSkeleton type="text" width={300} height={40} />
            </Box>
          </Grid>

          {/* Sidebar/Categories Skeleton */}
          <Grid item xs={12} md={4}>
            <ContentSkeleton type="text" textLines={5} height={268} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
