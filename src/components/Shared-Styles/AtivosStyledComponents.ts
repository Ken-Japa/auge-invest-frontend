import { Typography, Box, Paper, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

import { typography, spacing, borderRadius, shadows } from '@/theme/variables'

export const ContentWrapper = styled(Container)(() => ({
  position: 'relative',
  zIndex: 1,
  marginBottom: spacing.xxl,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  textAlign: 'center',
  alignItems: 'center',
}))

export const ContentBox = styled(Box)(() => ({
  position: 'relative',
  zIndex: 1,
  marginBottom: spacing.xxl,
}))

export const AtivosTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.xxxxl,
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
}))

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.secondary,
}))

export const AtivosContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginTop: spacing.xxl,
  paddingTop: spacing.xxl,
  marginBottom: spacing.md,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(19, 47, 76, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: borderRadius.md,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  boxShadow: shadows.lg,
}))

export const AtivosSearchWrapper = styled(Box)(() => ({
  display: 'flex',
  marginBottom: spacing.xl,
  justifyContent: 'center',
  alignItems: 'center',
}))

export const VisualizationContainer = styled(Box)(() => ({
  marginTop: spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
}))

export const EtfIconLink = styled(Box)(() => ({
  position: 'absolute',
  right: 0,
}))
