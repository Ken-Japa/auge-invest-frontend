import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, typography } from '@/theme/variables'

export const SummaryContainer = styled(Box)(({ theme }) => ({
  padding: spacing.md,
}))

export const SummaryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: `${spacing.sm} 0`,
  padding: `${spacing.xs} 0`,
  borderBottom: `1px dashed ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}))

export const SummaryLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: typography.fontSizes.sm,
}))

export const SummaryValue = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$ispositive',
})<{ $ispositive?: boolean }>(({ theme, $ispositive }) => ({
  fontWeight: typography.fontWeights.medium,
  fontSize: typography.fontSizes.md,
  color:
    $ispositive === true
      ? theme.palette.success.main
      : $ispositive === false
        ? theme.palette.error.main
        : theme.palette.text.primary,
}))
