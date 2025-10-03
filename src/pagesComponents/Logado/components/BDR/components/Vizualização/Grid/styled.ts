import { Box, Card as MuiCard, CardContent as MuiCardContent, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  boxShadow: theme.shadows[6],
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,

  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[9],
    borderColor: theme.palette.primary.main,
  },
}))

export const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2.5),
  },
}))

export const BDRName = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: theme.spacing(1),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.text.primary,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}))

export const CodeChip = styled(Chip)(({ theme }) => ({
  padding: theme.spacing(0.75, 1.5),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  fontSize: '0.85rem',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
}))

export const GridContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))
