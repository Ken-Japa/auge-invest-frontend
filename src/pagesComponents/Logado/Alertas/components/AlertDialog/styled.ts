import { DialogContent } from '@mui/material'
import { DialogTitle, Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, spacing, typography, shadows } from '@/theme/variables'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: `${spacing.md} ${spacing.lg}`,
  textAlign: 'center',
  fontSize: typography.fontSizes.xxl,
  fontWeight: typography.fontWeights.bold,
  borderBottom: 'none',
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  marginTop: spacing.md,
  padding: spacing.md,
}))
