import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, typography } from '@/theme/variables'

export const PageHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: spacing.xxl,
  '& h2': {
    color: theme.palette.text.primary,
    fontWeight: typography.fontWeights.bold,
    fontSize: typography.fontSizes.xxl,
  },
}))

export const ActionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  marginBottom: spacing.lg,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: spacing.md,
  },
}))

export const AlertTypography = styled(Typography)<{ type: 'buy' | 'sell' }>(({ theme, type }) => ({
  color: type === 'buy' ? theme.palette.success.main : theme.palette.error.main,
}))
