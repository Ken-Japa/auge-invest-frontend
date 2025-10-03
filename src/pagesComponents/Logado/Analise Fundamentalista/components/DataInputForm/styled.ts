import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontWeight: 700,
  fontSize: '1.25rem',
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
  marginBottom: theme.spacing(1),
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
