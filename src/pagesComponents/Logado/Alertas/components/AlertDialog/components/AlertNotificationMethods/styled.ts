import { FormGroup, FormLabel } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/theme/variables'

export const StyledFormLabel = styled(FormLabel)<{ component?: React.ElementType }>(({ theme }) => ({
  marginBottom: spacing.md,
  color: theme.palette.text.primary,
}))

export const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  gap: spacing.md,
  marginBottom: spacing.lg,
}))
