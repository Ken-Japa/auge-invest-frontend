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
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 'bold',
  textAlign: 'center',
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  marginTop: spacing.lg,
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: `${spacing.md} ${spacing.lg}`,
  gap: spacing.md,
  borderTop: `1px dashed ${theme.palette.divider}`,
  justifyContent: 'flex-end',
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

export const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: transitions.medium,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
