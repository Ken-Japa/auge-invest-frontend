import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, typography } from '@/theme/variables'

export const WalletSectionContainer = styled(Box)({})

export const WalletSectionHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
})

export const NoWalletsMessage = styled(Box)({
  textAlign: 'center',
})

export const WalletSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: typography.fontWeights.bold,
  margin: `${spacing.xxl} 0`,
}))
