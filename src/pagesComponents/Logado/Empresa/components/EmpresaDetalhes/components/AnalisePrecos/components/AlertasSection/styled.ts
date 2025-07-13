import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button, TextField, Grid } from '@mui/material';

export const AlertasSectionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export const AlertasSectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const AlertasSectionDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export const AlertFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const AlertInputContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const AlertTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const AlertButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
}));

export const BuyAlertButton = styled(AlertButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

export const SellAlertButton = styled(AlertButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

export const AlertHistoryContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const AlertHistoryTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}));