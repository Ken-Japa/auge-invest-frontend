import { Box, Paper, Chip, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const GridContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  padding: theme.spacing(2),
}));

export const GridItemPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  justifyContent: 'space-between',
}));

export const GridHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

export const GridTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const GridSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const CodeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

export const GridInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}));

export const GridInfoLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

export const GridInfoValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));