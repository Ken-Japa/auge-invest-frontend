import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { borderRadius, spacing } from '@/theme/variables'

export const DerivativosContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: borderRadius.md,
}))

export const VencimentoInfo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

export const TitleTypography = styled(Typography)(({ theme }) => ({
  marginBottom: spacing.xl,
  color: theme.palette.text.primary,
  textAlign: 'center',
}))

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: spacing.md,
})
