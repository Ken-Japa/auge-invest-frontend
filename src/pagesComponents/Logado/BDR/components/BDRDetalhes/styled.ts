import {
  Box,
  Button as MuiButton,
  Chip as MuiChip,
  Divider as MuiDivider,
  Paper,
  Typography,
  TypographyProps,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const DetailPageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  padding: theme.spacing(5, 4),
  marginTop: '-64px',
  paddingTop: theme.spacing(12),
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}))

export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1400px',
  margin: '0 auto',
  width: '100%',
}))

export const DetailContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}))

export const DetailPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[9],
  backgroundColor: theme.palette.background.paper,
  backdropFilter: 'blur(20px)',
  border: `2px solid ${theme.palette.divider}`,
}))

export const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
})

export const BDRTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '3rem',
  marginBottom: theme.spacing(1.5),
}))

export const BDRSubtitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.2rem',
  marginTop: theme.spacing(1),
}))

export const CodeChip = styled(MuiChip)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  fontWeight: 700,
  fontSize: '1rem',
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0.5, 1.5),
}))

export const SectionDivider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}))

export const InfoLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.75),
  fontSize: '1rem',
}))

export const InfoValue = styled(Typography)<TypographyProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.1rem',
  color: theme.palette.text.primary,
}))

export const InfoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}))

export const BackButton = styled(MuiButton)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}))

export const SectionTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  fontWeight: 800,
  fontSize: '2rem',
}))

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
})

export const ErrorContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}))
