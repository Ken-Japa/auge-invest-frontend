import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/theme/variables'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: spacing.md,
}))
