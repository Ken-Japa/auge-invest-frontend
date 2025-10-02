import { Grid } from '@mui/material'
import React from 'react'

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

interface BlogCardListSkeletonProps {
  count: number
}

export const BlogCardListSkeleton: React.FC<BlogCardListSkeletonProps> = ({ count }) => {
  return (
    <Grid container spacing={4}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ContentSkeleton type="card" cardHeight={300} />
        </Grid>
      ))}
    </Grid>
  )
}
