import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const RelatedPostsContainer = styled(Box)(({ theme }) => ({}))

export const RelatedPostsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
}))
