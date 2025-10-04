import { Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { spacing, transitions } from '@/theme/variables'

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: spacing.md,
  height: '100%',
  cursor: 'pointer',
  boxShadow: theme.shadows[3],
  transition: transitions.medium,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}))

export const StyledValueTypography = styled(Typography)(() => ({
  fontWeight: 600,
}))
