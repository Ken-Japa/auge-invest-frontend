import { styled } from '@mui/material/styles'

import { spacing, typography, border } from '@/theme/variables'

export const StepsList = styled('ul')(({ theme }) => ({
  marginBottom: spacing.md,
  paddingLeft: spacing.md,
  '& .highlight': {
    color: theme.palette.error.main,
    fontWeight: typography.fontWeights.bold,
  },
  '& li': {
    marginBottom: spacing.xs,
  },
}))

export const SectionTitle = styled('h2')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: typography.fontSizes.lg,
  marginTop: spacing.xl,
  marginBottom: spacing.md,
}))

export const MetricsTable = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  margin: `${spacing.md} 0`,
}))

export const MetricsTableRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  gap: spacing.md,
  padding: spacing.xs,
  borderBottom: `${border.solid1px} ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: border.none,
  },
}))
