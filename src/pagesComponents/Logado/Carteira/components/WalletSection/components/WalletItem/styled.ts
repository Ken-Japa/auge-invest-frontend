import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, transitions } from '@/theme/variables'

export const WalletContainer = styled(Box)(({ theme }) => ({}))

export const WalletItemContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  overflow: 'hidden',
}))

export const WalletSummaryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  flexGrow: 1,
}))

export const WalletDetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.common.white,
}))

export const WalletActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
}))

export const PositionsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: spacing.md,
}))

export const EditButton = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  transition: transitions.medium,
  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}))
