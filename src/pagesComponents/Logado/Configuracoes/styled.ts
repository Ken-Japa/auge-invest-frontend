import { Box, Typography, Container, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'

import { customColors, spacing, typography } from '@/theme/variables'

export const SettingsTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: spacing.xxl,
  color: customColors.accordionTitle[theme.palette.mode],
  fontWeight: typography.fontWeights.semiBold,
}))

export const SettingsControlContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
}))

export const SliderContainer = styled(Box)(() => ({
  marginBottom: spacing.xxl,
  '&:last-child': {
    marginBottom: 0,
  },
}))

export const SliderLabel = styled(Typography)(({ theme }) => ({
  color: customColors.accordionTitle[theme.palette.mode],
  marginBottom: spacing.xs,
}))

export const SliderDescription = styled(Typography)(({ theme }) => ({
  color: customColors.accordionBody[theme.palette.mode],
  marginTop: spacing.xs,
}))

export const StyledContainer = styled(Container)(() => ({
  paddingTop: spacing.xxl,
  paddingBottom: spacing.xxl,
}))

export const StyledAlert = styled(Alert)(() => ({
  width: '100%',
}))
