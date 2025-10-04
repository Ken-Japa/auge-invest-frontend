import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, shadows, spacing, typography } from '@/theme/variables'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: borderRadius.md,
    boxShadow: shadows.md,
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: spacing.md,
  fontSize: typography.fontSizes.lg,
  fontWeight: typography.fontWeights.bold,
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  marginTop: spacing.md,
  padding: spacing.md,
}))

export const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: spacing.md,
  justifyContent: 'space-between',
}))

export const StyledButtonCancel = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

export const StyledButtonConfirm = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}))
