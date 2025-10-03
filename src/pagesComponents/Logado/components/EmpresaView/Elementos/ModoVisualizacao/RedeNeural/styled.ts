import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GraphContainer = styled(Box)(() => {
  return {
    height: '800px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    '.vis-network': {
      height: '100%',
      width: '100%',
    },
  }
})
export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 64px)',
  width: '100%',
  background:
    theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
}))

export const MenuContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    top: 'auto',
    right: 'auto',
    bottom: 16,
    left: 16,
    width: 'calc(100% - 32px)',
    justifyContent: 'center',
  },
}))

export const SelectedNodePathContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 2,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    top: 16,
    left: 16,
    right: 16,
    width: 'calc(100% - 32px)',
    textAlign: 'center',
  },
}))

export const StyledLoadingTypography = styled(Typography)(() => ({
  marginTop: '16px',
  color: 'white',
}))

export const ErrorBox = styled(Box)(() => ({
  padding: '16px',
}))

export const StyledNodePathTypography = styled(Typography)(() => ({
  color: 'white',
}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  zIndex: 2,
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: theme.palette.primary.main,
  },
  padding: '2px',
}))

export const DropdownsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '8px',
}))
