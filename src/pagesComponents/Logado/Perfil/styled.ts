import { Box, ButtonProps, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ElementType } from 'react'

import { CustomButton } from '@/components/Core/Button'
import { transitions } from '@/theme/variables'

export const ProfileCard = styled(Paper)(({ theme }) => ({
  maxWidth: 1000,
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(4),
  background: theme.palette.mode === 'dark' ? 'rgba(19, 47, 76, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  marginBottom: theme.spacing(4),
}))

export const ProfileTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '2.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
  variant: 'h1',
}))

export const ContactButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  maxWidth: 800,
  margin: `${theme.spacing(4)} auto`,
}))

export const StyledContactButton = styled(CustomButton)<
  ButtonProps & {
    component?: ElementType
  }
>(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(19, 47, 76, 0.4)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  padding: theme.spacing(1, 3),
  transition: transitions.medium,
  '&:hover': {
    background: theme.palette.mode === 'dark' ? 'rgba(19, 47, 76, 0.6)' : 'rgba(255, 255, 255, 0.9)',
    boxShadow: theme.shadows[4],
  },
}))

export const ProfileSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}))

export const ProfileLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  minWidth: 120,
}))

export const ProfileValue = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  textAlign: 'right',
}))
