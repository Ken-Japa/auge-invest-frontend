import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { typography } from '@/theme/variables'

export const StyledAssetTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.6rem',
  fontWeight: typography.fontWeights.medium,
}))
