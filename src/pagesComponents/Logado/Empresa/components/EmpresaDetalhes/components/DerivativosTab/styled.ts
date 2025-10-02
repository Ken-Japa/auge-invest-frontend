import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const DerivativosContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: '12px',
}))

export const VencimentoInfo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

export const TitleTypography = styled(Typography)(({ theme }) => ({
  marginBottom: '24px',
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(3),
}))
