import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

import { border } from '@/theme/variables'

export const StyledTextField = styled(TextField)(() => ({
  width: 'fit-content',
  '& .MuiInputBase-root': {
    fieldset: {
      border: border.none,
    },
  },
  '& .MuiInputBase-input': {
    textAlign: 'inherit',
  },
}))
