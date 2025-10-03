import { FormControlLabel, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTextField = styled(TextField)<{ textAlign?: 'left' | 'right' }>(
  ({ theme, textAlign }) => ({
    width: 'fit-content',

    '& .MuiInputBase-input': {
      textAlign: textAlign || 'inherit',
    },
  }),
)

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}))
