import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, transitions } from '@/theme/variables'

export const ContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: borderRadius.lg,
  boxShadow: theme.shadows[3],
  border: `1px solid ${theme.palette.divider}`,
  transition: transitions.medium,
  marginBottom: theme.spacing(6),
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 34, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  },
}))

export const StyledPaperInput = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: borderRadius.lg,
  boxShadow: theme.shadows[3],
  border: `1px solid ${theme.palette.divider}`,
  transition: transitions.medium,
  marginBottom: theme.spacing(6),
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 34, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  },
}))

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: 42,
  textAlign: 'center',
  letterSpacing: '0.02em',
}))
