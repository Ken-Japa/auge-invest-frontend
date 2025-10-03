import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const EmpresasContainer = styled(Box)({
  width: '100%',
  height: '100%',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 500,
  color: theme.palette.primary.main,
}))

export const ControlsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
  borderRadius: theme.shape.borderRadius,
}))

export const TitleWrapper = styled(Box)({
  flexGrow: 1,
  textAlign: 'center',
})

export const VisualizationWrapper = styled(Box)(() => ({
  height: '100%',
  flex: 1,
}))
