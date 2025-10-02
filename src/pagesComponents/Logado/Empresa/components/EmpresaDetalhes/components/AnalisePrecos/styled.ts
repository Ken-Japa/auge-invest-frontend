import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}))

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 400,
  width: '100%',
}))

export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 400,
  width: '100%',
}))

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
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
