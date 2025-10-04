import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, transitions, borderRadius } from '@/theme/variables'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: borderRadius.md,
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 600,
  padding: spacing.md,
  textAlign: 'center',
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: spacing.lg,
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: spacing.md,
  gap: spacing.md,
  borderTop: `1px dashed ${theme.palette.divider}`,
  marginBottom: spacing.sm,
}))

export const CancelButton = styled(Button)(({ theme }) => ({
  border: `1px solid`,
  color: theme.palette.text.secondary,
  transition: transitions.medium,

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: transitions.medium,

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
