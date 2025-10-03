import { Box, Container, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,

  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'center',
}))

export const ContentBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  marginBottom: theme.spacing(8),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
}))

export const BDRTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 48,
  textAlign: 'center',
  marginBottom: theme.spacing(1),
}))

export const BDRSubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
  fontSize: 18,
}))

export const BDRTabsContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  backdropFilter: 'blur(15px)',
  borderRadius: theme.shape.borderRadius * 3,
  border: `2px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[9],
}))

export const SearchWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))
