import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, transitions, typography } from '@/theme/variables'

export const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.lg,
  color: theme.palette.text.primary,
  transition: transitions.medium,
}))

export const FormContainer = styled(Grid)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 34, 52, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    transition: transitions.medium,
  },
}))

export const SectionContainer = styled(Grid)(({ theme }) => ({
  marginBottom: spacing.xs,
}))

export const FieldContainer = styled(Grid)(({ theme }) => ({
  '& .MuiFormControl-root': {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  '& .MuiOutlinedInput-root': {
    transition: transitions.medium,
  },
}))
