import { Alert, AlertProps, Snackbar as MuiSnackbar } from '@mui/material'
import React from 'react'

interface SnackbarProps {
  open: boolean
  message: string
  severity?: AlertProps['severity']
  onClose: () => void
  autoHideDuration?: number
}

export const Snackbar = ({
  open,
  message,
  severity = 'info',
  onClose,
  autoHideDuration = 6000,
}: SnackbarProps) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
