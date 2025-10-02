import { Accordion, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CustomAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
  color: theme.palette.text.primary,
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.primary,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
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
