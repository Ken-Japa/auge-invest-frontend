import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, typography } from '@/theme/variables'

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: borderRadius.md,
  boxShadow: theme.shadows[1],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
  border: '1px solid transparent',
}))

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 400,
  width: '100%',
})

export const ErrorContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 400,
  width: '100%',
})

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: typography.fontWeights.semiBold,
}))

export const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}))

export const ChartContainer = styled(Box)(({ theme }) => ({
  height: 400,
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))
