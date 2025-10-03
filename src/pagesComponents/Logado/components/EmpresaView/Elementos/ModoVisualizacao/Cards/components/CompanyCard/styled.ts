import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const HeaderContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  marginBottom: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const InfoIconContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const CompanyTitle = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  transition: transitions.medium,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
  fontWeight: 700,
  fontSize: '1.25rem',
  lineHeight: 1.3,
  marginBottom: theme.spacing(0.5),
  paddingRight: theme.spacing(4), // Espaço para o ícone
  textShadow:
    theme.palette.mode === 'dark' ? '0px 0px 8px rgba(255,255,255,0.2)' : '0px 0px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

export const SegmentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : theme.palette.text.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '0.8rem',
  marginTop: theme.spacing(0.25),
  display: 'block',
}))

export const IndustryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : theme.palette.text.secondary,
  fontWeight: 600,
  fontSize: '0.85rem',
  display: 'block',
  marginBottom: theme.spacing(0.5),
}))

export const MarketValueText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(0.5),
  fontWeight: 700,
  fontSize: '1.4rem',
  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
}))

export const ParticipationText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
  fontSize: '0.8rem',
}))

export const CodesTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  fontSize: '0.9rem',
  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
}))
