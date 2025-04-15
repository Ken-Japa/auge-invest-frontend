import { styled } from '@mui/material/styles';
import { Card as MuiCard, CardContent as MuiCardContent, Box, Typography, Chip as MuiChip } from '@mui/material';

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 40, 60, 0.8)' : theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: theme.spacing(1),
  '&:last-child': {
    paddingBottom: theme.spacing(1.5),
  },
}));

export const FIIName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '0.9rem',
  lineHeight: 1.2,
  marginBottom: theme.spacing(0.5),
  height: '2.4em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

export const CodeChip = styled(MuiChip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '0.75rem',
  height: '24px',
}));

export const GridContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));