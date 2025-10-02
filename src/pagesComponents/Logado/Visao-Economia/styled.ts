import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

interface BackgroundContainerProps {
  headerheight: number
  footerheight: number
}

export const BackgroundContainer = styled(Box)<BackgroundContainerProps>(
  ({ headerheight, footerheight }) => ({
    width: '100%',
    position: 'relative',
    willChange: 'transform',
    paddingTop: `${headerheight}px`,
    paddingBottom: `${footerheight}px`,
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
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
    },
  }),
)

interface StyledContainerProps {
  $isloading: boolean
}

export const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== '$isloading',
})<StyledContainerProps>(({ $isloading, theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  opacity: $isloading ? 0.8 : 1,
  transition: 'opacity 0.3s ease-in-out',
}))

export const SearchBarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}))

interface SuspenseFallbackBoxProps {
  height: string
}

export const SuspenseFallbackBox = styled(Box)<SuspenseFallbackBoxProps>(({ height }) => ({
  height: height,
}))

export const DashboardItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  height: '100%',
  minHeight: '100px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  willChange: 'transform',

  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}))

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: 36,
  textAlign: 'center',
}))

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 300,
  fontSize: 24,
  textAlign: 'center',
  paddingBottom: 12,
}))
