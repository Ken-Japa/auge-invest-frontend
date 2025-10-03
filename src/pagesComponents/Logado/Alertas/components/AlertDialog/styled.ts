import { DialogContent } from '@mui/material'
import { DialogTitle, Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[10],
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.5, 3),
  textAlign: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  borderBottom: 'none',
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2.5),
}))
