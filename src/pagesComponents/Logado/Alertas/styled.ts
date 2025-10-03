import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/theme/variables'

export const PageHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  '& h2': {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: '2.5rem',
  },
}))

export const ActionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: spacing.md,
  },
}))

export const AlertTypography = styled(Typography)<{ type: 'buy' | 'sell' }>(({ theme, type }) => ({
  color: type === 'buy' ? theme.palette.success.main : theme.palette.error.main,
}))
