import { Box, FormControl } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const ColorBox = styled(Box)(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  marginRight: theme.spacing(1),
}))

export const MenuItemContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})
