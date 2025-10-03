import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const EmpresasContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? "url('/assets/images/background/Empresas-Dark.webp')"
      : "url('/assets/images/background/Empresas-Light.webp')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.2)',
    pointerEvents: 'none',
  },
}))

export const SearchBarWrapper = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(3),
}))

export const ContentContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(8),
  borderRadius: '12px',
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.98)' : 'rgba(255, 255, 255, 0.98)',
}))

export const ControlsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: 'fit-content',
  margin: '0 auto',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 48,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
}))
