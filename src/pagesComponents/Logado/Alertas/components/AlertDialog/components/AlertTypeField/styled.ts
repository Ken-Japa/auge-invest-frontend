import { FormLabel, RadioGroup } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/theme/variables'

export const StyledFormLabel = styled(FormLabel)<{ component?: React.ElementType }>(({ theme }) => ({
  color: theme.palette.text.primary,
}))

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  justifyContent: 'center',
  gap: spacing.lg,
  marginBottom: spacing.lg,
}))
