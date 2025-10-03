import { FormGroup, FormLabel } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledFormLabel = styled(FormLabel)<{ component?: React.ElementType }>(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}))

export const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}))
