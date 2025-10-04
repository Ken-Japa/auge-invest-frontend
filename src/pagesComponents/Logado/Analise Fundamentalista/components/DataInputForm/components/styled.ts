import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, border } from '@/theme/variables'

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderBottom: `${border.solid1px} ${theme.palette.primary.main}`,
  marginBottom: spacing.lg,
  marginTop: spacing.lg,
}))
