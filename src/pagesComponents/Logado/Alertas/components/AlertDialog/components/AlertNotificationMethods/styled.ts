import { FormGroup, FormLabel } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledFormLabel = styled(FormLabel)<{ component?: React.ElementType }>(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}))

export const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))
