import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  transition: transitions.medium,
}))

export const FormContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'transparent',
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    transition: transitions.medium,
  },
}))

export const SectionContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  },
}))

export const FieldContainer = styled(Grid)(({ theme }) => ({
  '& .MuiFormControl-root': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  '& .MuiOutlinedInput-root': {
    transition: transitions.medium,
  },
}))
