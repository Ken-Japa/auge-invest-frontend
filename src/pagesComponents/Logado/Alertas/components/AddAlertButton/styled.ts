import { styled } from '@mui/material/styles'

import { CustomButton } from '@/components/Core/Button'
import { spacing, typography } from '@/theme/variables'

export const StyledAddAlertButton = styled(CustomButton)(({ theme }) => ({
  margin: `${spacing.lg} 0`,
  fontSize: typography.fontSizes.lg,
}))
