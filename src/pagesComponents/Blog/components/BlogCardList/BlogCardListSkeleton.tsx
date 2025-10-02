import { Box, Grid, Skeleton } from '@mui/material'

export const BlogCardListSkeleton = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} key={index}>
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Skeleton
          variant="rectangular"
          width={300}
          height={40}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 1,
          }}
        />
      </Box>
    </Box>
  )
}
