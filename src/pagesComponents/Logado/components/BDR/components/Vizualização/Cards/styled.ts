import { Box, Card as MuiCard, CardContent as MuiCardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, spacing, transitions } from '@/theme/variables'

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: transitions.medium,
  boxShadow: theme.shadows[6],
  borderRadius: borderRadius.lg,
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,

  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[9],
    borderColor: theme.palette.primary.main,
  },
}))

export const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: spacing.md,
}))

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.35rem',
  marginBottom: theme.spacing(0.5),
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

export const CardSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: spacing.md,
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '40px',
}))

export const ChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: spacing.sm,
  margin: `${spacing.md} 0`,
  padding: spacing.sm,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.action.hover,
}))

export const InfoContainer = styled(Box)(({ theme }) => ({
  marginTop: spacing.lg,
}))

export const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: spacing.sm,
  paddingBottom: spacing.xs,
  borderBottom: `1px dashed ${theme.palette.divider}`,

  '&:last-child': {
    marginBottom: 0,
    borderBottom: 'none',
  },
}))

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
}))

export const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  textAlign: 'right',
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
}))
