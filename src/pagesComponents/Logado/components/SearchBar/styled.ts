import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const GlobalSearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mb: 3,
  padding: theme.spacing(2),
}))
