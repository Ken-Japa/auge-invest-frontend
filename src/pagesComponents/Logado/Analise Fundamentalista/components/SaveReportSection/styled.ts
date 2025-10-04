import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, transitions, typography } from '@/theme/variables'

export const SaveReportContainer = styled(Box)(({ theme }) => ({
  padding: spacing.lg,
  transition: transitions.medium,
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: spacing.lg,
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.lg,
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  paddingBottom: spacing.md,
  letterSpacing: typography.letterSpacing.md,
  transition: transitions.medium,
}))
