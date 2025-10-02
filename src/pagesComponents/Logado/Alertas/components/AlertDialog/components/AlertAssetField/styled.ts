import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledAssetTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}))
