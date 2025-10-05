import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, shadows, spacing } from '@/theme/variables'

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
  borderRadius: borderRadius.sm,
  backgroundColor: theme.palette.background.paper,
  boxShadow: shadows.lg,
  marginBottom: spacing.lg,
}))

export const ContentContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: spacing.xxl,
  marginBottom: spacing.xxxxl,
  borderRadius: borderRadius.lg,
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.98)' : 'rgba(255, 255, 255, 0.98)',
}))

export const ControlsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing.md,
  width: 'fit-content',
  margin: '0 auto',
  padding: spacing.md,
  borderRadius: borderRadius.sm,
  backgroundColor: theme.palette.background.paper,
  boxShadow: shadows.md,
  marginTop: spacing.md,
  marginBottom: spacing.md,
}))
