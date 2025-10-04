import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, spacing, transitions } from '@/theme/variables'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '500px',
    borderRadius: borderRadius.md,
    boxShadow: theme.shadows[5],
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: spacing.md,
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textAlign: 'center',
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(6),
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  gap: theme.spacing(2),
  borderTop: `1px dashed ${theme.palette.divider}`,
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(1),
}))

export const CancelButton = styled(Button)(({ theme }) => ({
  border: `1px solid`,
  color: theme.palette.text.secondary,
  transition: transitions.medium,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const UpdateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: transitions.medium,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
