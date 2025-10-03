import { FormLabel, RadioGroup } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledFormLabel = styled(FormLabel)<{ component?: React.ElementType }>(({ theme }) => ({
  color: theme.palette.text.primary,
}))

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  justifyContent: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}))
