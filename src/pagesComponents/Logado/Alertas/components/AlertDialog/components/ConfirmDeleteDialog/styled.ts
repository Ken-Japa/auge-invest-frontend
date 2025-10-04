import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius } from '@/theme/variables'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: borderRadius.md,
    boxShadow: theme.shadows[5],
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  fontSize: '1.2rem',
  fontWeight: 700,
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}))

export const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
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
