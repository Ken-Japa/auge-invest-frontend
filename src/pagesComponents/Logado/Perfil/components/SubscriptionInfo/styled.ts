import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'

export const SubscriptionContainer = styled(motion.div)({
  width: '100%',
})

export const SubscriptionField = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
  '&:last-child': {
    borderBottom: 'none',
  },
}))

export const LabelRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

interface StyledTextProps {
  darkMode?: boolean
}

export const StyledProfileLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'darkMode',
})<StyledTextProps>(({ theme, darkMode }) => ({
  fontWeight: 500,
  color: darkMode ? 'rgba(0, 0, 0, 0.7)' : theme.palette.text.secondary,
  variant: 'body2',
  fontSize: '0.95rem',
}))

export const StyledProfileValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'darkMode',
})<StyledTextProps>(({ theme, darkMode }) => ({
  color: darkMode ? 'rgba(0, 0, 0, 0.9)' : theme.palette.text.primary,
  fontWeight: 500,
  variant: 'body1',
  marginLeft: theme.spacing(0.5),
  fontSize: '1.05rem',
}))

export const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}))
