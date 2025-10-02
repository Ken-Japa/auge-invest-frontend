import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.common.white,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 3,

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  transform: 'translateZ(0)',
  willChange: 'transform',
  transition: 'background-color 0.2s',
}))
