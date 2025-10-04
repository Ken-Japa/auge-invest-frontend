import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, typography, layout } from '@/theme/variables'

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
  height: layout.walletLoadingContainerHeight,
})

export const NoWalletsMessage = styled(Box)({
  textAlign: 'center',
})

export const WalletSectionTitle = styled(Typography)(() => ({
  fontWeight: typography.fontWeights.bold,
  margin: `${spacing.xxl} 0`,
}))
