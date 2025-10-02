import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TooltipContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.75rem',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  maxWidth: 200,
}))

export const TooltipTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}))

export const TooltipRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}))

export const TooltipLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.grey[400],
}))

export const TooltipValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}))

export const ChartTextStyle = styled(Typography)(({ theme }) => ({
  fill: theme.palette.text.primary,
  fontSize: 12,
}))
