import {
  Box,
  Button as MuiButton,
  Chip as MuiChip,
  Divider as MuiDivider,
  Paper,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, shadows, spacing, typography } from '@/theme/variables'

export const DetailPageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  padding: `${spacing.xxl} ${spacing.md}`,
  marginTop: '-64px',
  paddingTop: '84px',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}))

export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
}))

export const DetailContainer = styled(Box)(({ theme }) => ({
  marginTop: spacing.xxl,
}))

export const DetailPaper = styled(Paper)(({ theme }) => ({
  padding: spacing.lg,
  marginBottom: spacing.xxl,
  borderRadius: borderRadius.sm,
  boxShadow: shadows.lg,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(19, 47, 76, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
}))

export const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
})

export const FIITitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}))

export const FIISubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

export const CodeChip = styled(MuiChip)(({ theme }) => ({
  marginLeft: spacing.xs,
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.md,
}))

export const SectionDivider = styled(MuiDivider)(({ theme }) => ({
  margin: `${spacing.md} 0`,
}))

export const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: spacing.xxs,
}))

export const InfoValue = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
})

export const InfoContainer = styled(Box)(({ theme }) => ({
  marginBottom: spacing.md,
}))

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: spacing.xs,
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}))

export const BackButton = styled(MuiButton)(({ theme }) => ({
  marginBottom: spacing.lg,
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: spacing.md,
  fontWeight: theme.typography.fontWeightMedium,
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
