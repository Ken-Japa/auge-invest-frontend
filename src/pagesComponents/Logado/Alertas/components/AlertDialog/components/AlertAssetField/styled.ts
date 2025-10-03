import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledAssetTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.6rem',
  fontWeight: 600,
}))
