import { FormControlLabel, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  maxWidth: '200px',
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
}))

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({}))
