import React from 'react';
import { Snackbar as MuiSnackbar, Alert, AlertProps } from '@mui/material';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertProps['severity'];
  onClose: () => void;
}

export const Snackbar = ({ open, message, severity = 'info', onClose }: SnackbarProps) => {
  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};