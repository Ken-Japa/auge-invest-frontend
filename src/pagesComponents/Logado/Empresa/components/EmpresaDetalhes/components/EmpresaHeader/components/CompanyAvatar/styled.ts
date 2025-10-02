import { Avatar, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

interface StyledAvatarProps {
  size: number
}

export const StyledCompanyAvatar = styled(Avatar)<StyledAvatarProps>(({ size }) => ({
  width: size,
  height: size,
  bgcolor: '#1a2234',
  fontSize: size * 0.4,
  fontWeight: 'bold',
}))

export const StyledCompanyAvatarBox = styled(Box)<StyledAvatarProps>(({ size }) => ({
  width: size,
  height: size,
  position: 'relative',
  borderRadius: '50%',
  overflow: 'hidden',
}))
