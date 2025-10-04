import { Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, spacing, typography, shadows } from '@/theme/variables'

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: typography.fontWeights.semiBold,
  position: 'relative',
  textAlign: 'center',
  marginBottom: spacing.xxl,
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: spacing.xxxxl,
    height: spacing.xs,
    backgroundColor: theme.palette.primary.main,
    borderRadius: borderRadius.sm,
  },
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: spacing.md,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: borderRadius.md,
  boxShadow: shadows.sm,
}))

export const GridContainer = styled(Grid)({
  marginBottom: spacing.lg,
})

export const GridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
})
