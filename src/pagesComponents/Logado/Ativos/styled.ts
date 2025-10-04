import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'

import { borderRadius, shadows, spacing, typography, gradients } from '@/theme/variables'

export const Page = styled(Container)(({ theme }) => ({
  zIndex: 1,
  position: 'relative',
  paddingTop: spacing.xl,
  '& .text-gradient': {
    background: gradients.primaryToSecondary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    marginBottom: spacing.md,
    fontWeight: typography.fontWeights.bold,
    textAlign: 'center',
  },
  '& .subtitle': {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    maxWidth: '800px',
    margin: `0 auto ${spacing.xl}`,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.lineHeights.md,
  },
  '& .grid-container': {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}))

export const AtivosHeader = styled(Box)({
  marginBottom: spacing.xl,
  textAlign: 'center',
  paddingTop: spacing.md,
})

export const AtivosGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: spacing.xl,
  maxWidth: '1200px',
  margin: '0 auto',
  '@media (min-width: 600px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (min-width: 960px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
})

export const AtivoCard = styled(motion.div)<{ available: string }>(({ theme, available }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, rgba(26, 34, 52, 0.95), rgba(26, 34, 52, 0.85))'
      : 'linear-gradient(145deg, #ffffff, #f5f8fa)',
  borderRadius: borderRadius.lg,
  overflow: 'hidden',
  height: '100%',
  cursor: available ? 'pointer' : 'default',
  position: 'relative',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
  boxShadow: shadows.md,
  transition: 'all 0.3s ease',
  opacity: available === 'true' ? 1 : 0.85,
  '&:hover': {
    borderColor: available === 'true' ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.3)',
  },
}))

export const CardContent = styled(Box)({
  padding: spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
})

export const CardIcon = styled(Box)({
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing.lg,
  background: gradients.primaryToSecondaryAlt,
  color: 'white',
  boxShadow: shadows.lg,
})

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: typography.fontSizes.lg,
  fontWeight: typography.fontWeights.semiBold,
  marginBottom: spacing.md,
  color: theme.palette.text.primary,
}))

export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: typography.fontSizes.sm,
  color: theme.palette.text.secondary,
  marginBottom: spacing.lg,
  lineHeight: typography.lineHeights.md,
}))

export const ComingSoonBadge = styled(Box)({
  position: 'absolute',
  top: spacing.md,
  right: spacing.md,
  background: gradients.warningToError,
  color: 'white',
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: borderRadius.full,
  fontSize: typography.fontSizes.xs,
  fontWeight: typography.fontWeights.semiBold,
  boxShadow: shadows.sm,
})
