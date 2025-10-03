import { DialogContent } from '@mui/material'
import { DialogTitle, Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2, 3),
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: 400,
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
}))
