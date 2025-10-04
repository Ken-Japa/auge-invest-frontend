import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { border, spacing, transitions, typography } from '@/theme/variables'

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: spacing.lg,
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.lg,
  color: theme.palette.text.primary,
  borderBottom: `${border.solid2px} ${theme.palette.divider}`,
  paddingBottom: spacing.md,
  letterSpacing: typography.letterSpacing.md,
  transition: transitions.medium,
}))

export const InputLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: spacing.xs,
  fontSize: typography.fontSizes.sm,
  transition: transitions.medium,
}))

export const SectionContainer = styled(Box)(() => ({
  padding: spacing.lg,
  transition: transitions.medium,
}))
