import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SensitivityContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(13, 149, 249, 0.08)',
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(3),
  allignItems: 'center',
  textAlign: 'center',
}))
