import { Box, Paper, Tab, Tabs, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { borderRadius, spacing, typography } from '@/theme/variables'

export const EmpresaContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: '100vh',
}))

export const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  borderRadius: borderRadius.md,
  backdropFilter: 'blur(16px)',
  padding: theme.spacing(3),
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}))

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}))
export const StyledTabsPaper = styled(Paper)(({ theme }) => ({
  justifyContent: 'center',
  display: 'flex',
  borderRadius: '12px',
}))

export const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 75,
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: theme.palette.common.white,
  '&:hover': {
    color: theme.palette.primary.light,
    opacity: 1,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&:focus': {
    color: theme.palette.primary.main,
  },
}))

// Componentes adicionais estilizados
export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
  width: '100%',
})

export const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.error.main,
}))

export const TabContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid transparent',
  '&:hover': {
    boxShadow: theme.shadows[4],
    border: `1px solid ${theme.palette.divider}`,
  },
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}))

export const SectionTitle = styled(Typography)({
  marginBottom: spacing.md,
  fontWeight: typography.fontWeights.medium,
})

export const SectionDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}))

export const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}))
