import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GlobalSearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mb: theme.spacing(4),

  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 3,
}))
