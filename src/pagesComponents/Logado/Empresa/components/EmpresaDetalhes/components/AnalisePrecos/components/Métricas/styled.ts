import { Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MetricasContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}))

export const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  boxShadow: theme.shadows[1],
  borderRadius: '12px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}))

export const MetricTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  color: theme.palette.text.secondary,
}))

export const MetricValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
}))

export const MetricSecondaryValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  marginTop: theme.spacing(0.5),
}))
