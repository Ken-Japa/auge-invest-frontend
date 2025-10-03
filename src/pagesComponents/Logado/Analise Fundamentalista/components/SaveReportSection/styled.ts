import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const SaveReportContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: transitions.medium,
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  fontSize: '1.25rem',
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  paddingBottom: theme.spacing(1.5),
  letterSpacing: '0.03em',
  transition: transitions.medium,
}))
