import { styled } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';

export const GraficoContainer = styled(Box)(({ theme }) => ({
  height: 400,
  width: '100%',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const GraficoTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 400,
  width: '100%',
}));

export const ErrorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.error.main,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const EmptyDataContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const TooltipContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.75rem',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  maxWidth: 200,
}));

export const TooltipTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}));

export const TooltipRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}));

export const TooltipLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.grey[400],
}));

export const TooltipValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

export const AlertMarker = styled(Box)<{ color: string }>(({
  theme,
  color,
}) => ({
  width: 10,
  height: 10,
  backgroundColor: color,
  borderRadius: '50%',
  marginRight: theme.spacing(0.5),
}));