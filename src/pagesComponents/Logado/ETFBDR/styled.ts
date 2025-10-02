import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const ETFBDRTabsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: 36,
  textAlign: 'center',
}))

export const ETFTabsContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(19, 47, 76, 0.85)' : 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  boxShadow: '12px',
}))

export const AbsoluteLink = styled(Box)(() => ({
  position: 'absolute',
  right: 0,
}))
