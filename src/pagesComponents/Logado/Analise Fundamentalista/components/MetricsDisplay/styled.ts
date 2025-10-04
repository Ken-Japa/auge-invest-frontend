import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, transitions, typography, border } from '@/theme/variables'

export const CategoryContainer = styled(Grid)(() => ({
  transition: transitions.medium,
}))

export const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.xl,
  color: theme.palette.text.primary,
  marginBottom: spacing.lg,
  borderBottom: `${border.solid2px} ${theme.palette.primary.main}`,
  letterSpacing: typography.letterSpacing.md,
  transition: transitions.medium,
}))

export const MetricsGrid = styled(Grid)({
  display: 'flex',
  flexWrap: 'wrap',
})

export const UnitText = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: spacing.xxs,
  fontSize: typography.fontSizes.sm,
  transition: transitions.medium,
}))

export const FormulaText = styled('span')(({ theme }) => ({
  color: theme.palette.info.light,
  display: 'block',
  marginTop: spacing.xs,
  fontSize: typography.fontSizes.xs,
  transition: transitions.medium,
}))
