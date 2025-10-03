import { Box, FormControl, IconButton, ListSubheader } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SegmentDropdownContainer = styled(Box)(({ theme }) => ({
  minWidth: 200,
  marginBottom: theme.spacing(2),
}))

export const StyledFormControl = styled(FormControl)({
  width: '100%',
})

export const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
}))

export const IndustryColorBox = styled(Box)(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  marginRight: theme.spacing(1),
}))

export const ToggleIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}))
