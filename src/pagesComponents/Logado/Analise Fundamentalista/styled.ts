import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, shadows, spacing, transitions, typography, border } from '@/theme/variables'

export const ContentContainer = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: spacing.xl,
  backgroundColor: theme.palette.background.paper,
  borderRadius: borderRadius.lg,
  boxShadow: shadows.md,
  border: `${border.solid1px} ${theme.palette.divider}`,
  transition: transitions.medium,
  marginBottom: spacing.xxxxl,
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 34, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  },
}))

export const StyledPaperInput = styled(Paper)(({ theme }) => ({
  padding: spacing.xxl,
  backgroundColor: theme.palette.background.default,
  borderRadius: borderRadius.lg,
  boxShadow: shadows.md,
  border: `${border.solid1px} ${theme.palette.divider}`,
  transition: transitions.medium,
  marginBottom: spacing.xxxxl,
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 34, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  },
}))

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: typography.fontWeights.semiBold,
  fontSize: typography.fontSizes.xxxxl,
  textAlign: 'center',
  letterSpacing: typography.letterSpacing.md,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
}))
