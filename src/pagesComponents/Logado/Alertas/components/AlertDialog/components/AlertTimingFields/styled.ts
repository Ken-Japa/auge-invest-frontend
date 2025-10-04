import { FormControlLabel, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/theme/variables'

export const StyledTextField = styled(TextField)<{ textAlign?: 'left' | 'right' }>(
  ({ theme, textAlign }) => ({
    width: 'fit-content',

    '& .MuiInputBase-input': {
      textAlign: textAlign || 'inherit',
    },
  }),
)

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  justifyContent: 'center',
  marginBottom: spacing.md,
}))
