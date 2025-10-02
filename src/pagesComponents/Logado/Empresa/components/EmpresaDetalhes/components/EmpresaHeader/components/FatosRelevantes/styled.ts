import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const InfoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  '& .MuiDivider-root': {
    backgroundColor: theme.palette.divider,
  },
}))

export const SectionTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'component',
})<{ component?: React.ElementType }>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontWeight: 600,
  color: theme.palette.text.primary,
  '& svg': {
    fontSize: 28,
    color: theme.palette.primary.main,
  },
}))

export const ItemList = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'component',
})<{ component?: React.ElementType }>(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  marginTop: theme.spacing(1),
  '& li': {
    marginBottom: theme.spacing(0.5),
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    '&::marker': {
      color: theme.palette.primary.main,
    },
  },
}))
