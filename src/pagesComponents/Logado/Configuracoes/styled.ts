import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, typography } from '@/theme/variables'

export const SettingsTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: spacing.xxl,
  color: theme.palette.text.primary,
  fontWeight: typography.fontWeights.semiBold,
}))

export const SettingsControlContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
}))

export const SliderContainer = styled(Box)(({ theme }) => ({
  marginBottom: spacing.xxl,
  '&:last-child': {
    marginBottom: 0,
  },
}))

export const SliderLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: spacing.xs,
}))

export const SliderDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: spacing.xs,
}))
