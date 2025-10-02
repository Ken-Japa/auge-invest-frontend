import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxWidth: '150px',
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
}))
