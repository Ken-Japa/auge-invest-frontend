import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

/**
 * Renders a user-friendly error message with an optional retry button.
 * @param {ErrorDisplayProps} props - The props for the ErrorDisplay component.
 * @param {string} [props.message] - The error message to display. Defaults to "Ocorreu um erro inesperado.".
 * @param {() => void} [props.onRetry] - Callback function to execute when the retry button is clicked.
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message = "Ocorreu um erro inesperado.",
  onRetry,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        textAlign: 'center',
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outlined" color="primary" onClick={onRetry} size="small">
          Tentar Novamente
        </Button>
      )}
    </Box>
  );
};