import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions, spacing, borderRadius } from '@/theme/variables'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: borderRadius.md,
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.error.dark,
  color: theme.palette.primary.contrastText,
  padding: spacing.md,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 'bold',
  textAlign: 'center',
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: spacing.lg,
  marginTop: spacing.lg,
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: `${spacing.md} ${spacing.lg}`,
  justifyContent: 'space-between',
}))

export const CancelButton = styled(Button)(({ theme }) => ({
  border: `1px solid`,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.info.main,
  color: theme.palette.primary.contrastText,

  transition: transitions.medium,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

export const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  transition: transitions.medium,
}))
