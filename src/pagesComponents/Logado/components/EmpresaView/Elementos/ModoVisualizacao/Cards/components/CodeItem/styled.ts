import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const CodeText = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: transitions.medium,
  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
  fontSize: '0.9rem',
  textShadow:
    theme.palette.mode === 'dark' ? '0px 0px 4px rgba(255,255,255,0.1)' : '0px 0px 4px rgba(0,0,0,0.05)',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

export const CodeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  width: '100%',
}))

export const PriceText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : theme.palette.text.secondary,
  fontSize: '0.8rem',
}))

export const VariationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1),
  padding: theme.spacing(0.25, 0.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}))

export const VariationText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'ispositive' && prop !== 'iszero',
})<{ ispositive: boolean; iszero?: boolean }>(({ theme, ispositive, iszero }) => ({
  color: iszero
    ? theme.palette.text.secondary
    : ispositive
      ? theme.palette.success.main
      : theme.palette.error.main,
  fontWeight: 'bold',
  fontSize: '0.85rem',
}))
