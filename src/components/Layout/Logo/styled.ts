import { styled } from '@mui/material/styles'

export const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '60px',
  height: '60px',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  '&:hover': {
    opacity: 0.9,
  },
})
