import { FormLabel, RadioGroup } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledFormLabel = styled(FormLabel)<{ component?: React.ElementType }>(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))
