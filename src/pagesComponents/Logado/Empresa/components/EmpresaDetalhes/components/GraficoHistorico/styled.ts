import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GraficoContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3)
}));

export const GraficoHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

export const ChartWrapper = styled(Box)({
  height: 400,
  position: 'relative'
});

export const LoadingContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});