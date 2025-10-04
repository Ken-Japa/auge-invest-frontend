import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/theme/variables'

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  marginBottom: spacing.lg,
  marginTop: spacing.lg,
}))
