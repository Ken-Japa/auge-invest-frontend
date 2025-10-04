import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { typography } from '@/theme/variables'

interface StyledContainerProps {
  $isloading: boolean
}

export const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== '$isloading',
})<StyledContainerProps>(({ $isloading, theme }) => ({
  paddingBottom: theme.spacing(4),
  opacity: 1,
  transition: 'opacity 0.3s ease-in-out',
}))

export const SearchBarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  marginTop: theme.spacing(4),
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
  border: '1px solid transparent',
  '&:hover': {
    border: `1px solid ${theme.palette.primary.hoverBorder}`,
  },
}))

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.xxxxl,
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
}))

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 300,
  fontSize: 24,
  textAlign: 'center',
  paddingBottom: 12,
}))
