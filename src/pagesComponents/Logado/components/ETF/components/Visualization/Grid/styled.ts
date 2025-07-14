import { styled } from '@mui/material/styles';
import { Grid, Paper, Box, Typography, Chip } from '@mui/material';

export const GridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const GridItemPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

export const GridHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '8px',
});

export const GridTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  lineHeight: 1.2,
}));

export const GridSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
  fontSize: '0.75rem',
}));

export const GridInfo = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '4px',
});

export const GridInfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.7rem',
  fontWeight: 'bold',
  minWidth: '70px',
}));

export const GridInfoValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.8rem',
  textAlign: 'right',
  flexGrow: 1,
}));

export const CodeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  fontSize: '0.6rem',
  height: '18px',
}));