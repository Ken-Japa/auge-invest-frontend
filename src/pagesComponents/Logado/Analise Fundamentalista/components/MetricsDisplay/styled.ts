import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const CategoryContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  transition: transitions.medium,
}))

export const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.3rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  letterSpacing: '0.03em',
  transition: transitions.medium,
}))

export const MetricsGrid = styled(Grid)({
  display: 'flex',
  flexWrap: 'wrap',
})

export const UnitText = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: '2px',
  fontSize: '0.9em',
  transition: transitions.medium,
}))

export const FormulaText = styled('span')(({ theme }) => ({
  color: theme.palette.info.light,
  display: 'block',
  marginTop: theme.spacing(1),
  fontSize: '0.8rem',
  transition: transitions.medium,
}))
