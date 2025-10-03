import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTextField = styled(TextField)<{ textAlign?: 'left' | 'right' }>(
  ({ theme, textAlign }) => ({
    width: 'fit-content',
    '& .MuiInputBase-root': {
      fieldset: {
        border: 'none',
      },
    },
    '& .MuiInputBase-input': {
      textAlign: textAlign || 'inherit',
    },
  }),
)
