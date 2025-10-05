import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'

export const HeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
})

export const DashboardIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
}))

export const DashboardIconStyled = styled(DashboardIcon)({
  fontSize: 30,
  cursor: 'pointer',
})