import { Dialog, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(10, 25, 41, 0.95)' : 'rgba(255, 255, 255, 0.95)',
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}))
