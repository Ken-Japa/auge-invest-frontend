import { styled } from '@mui/material/styles';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip as MuiChip, 
  Divider as MuiDivider,
  Button as MuiButton
} from '@mui/material';

export const DetailContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

export const DetailPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3]
}));

export const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap'
});

export const FIITitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold
}));

export const FIISubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));

export const CodeChip = styled(MuiChip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontWeight: 'bold',
  fontSize: '1rem'
}));

export const SectionDivider = styled(MuiDivider)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`
}));

export const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5)
}));

export const InfoValue = styled(Typography)({
  display: 'flex',
  alignItems: 'center'
});

export const InfoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center'
}));

export const BackButton = styled(MuiButton)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightMedium
}));

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh'
});

export const ErrorContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));