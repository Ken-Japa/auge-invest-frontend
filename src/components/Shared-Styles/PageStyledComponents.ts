import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const PageContainer = styled(Box)(() => ({
  width: '100%',
  position: 'relative',
  willChange: 'transform',
  minHeight: '100vh',
  '& .MuiGrid-item': {
    minHeight: '50px',
  },

  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, theme.opacity.low)',
    borderRadius: '4px',
  },
}))
