import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, spacing } from '@/theme/variables'

export const SensitivityContainer = styled(Box)(({ theme }) => ({
  padding: spacing.lg,
  backgroundColor: 'rgba(13, 149, 249, 0.08)',
  borderRadius: borderRadius.md,
  marginTop: spacing.lg,
  allignItems: 'center',
  textAlign: 'center',
}))
