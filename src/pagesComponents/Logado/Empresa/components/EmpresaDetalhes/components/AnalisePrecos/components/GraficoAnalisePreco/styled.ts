import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChartContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const ChartTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ChartDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const LegendContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

export const LegendColor = styled(Box)<{ color: string }>(({
  theme,
  color,
}) => ({
  width: 16,
  height: 16,
  backgroundColor: color,
  borderRadius: '50%',
}));

export const LegendText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));