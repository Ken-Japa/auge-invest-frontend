import { Paper, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, shadows } from '@/theme/variables'

export const StyledDividendosPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: borderRadius.md,
  boxShadow: shadows.md,
}))

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[1],
  transition: theme.transitions.create(['box-shadow', 'transform', 'border-color'], {
    duration: theme.transitions.duration.standard,
  }),
  border: '1px solid transparent',
  '&:hover': {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}))

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  '& .MuiTableCell-root': {
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.paper,
  },
  transition: theme.transitions.create(['background-color', 'transform', 'font-size'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: '#424242',
    cursor: 'pointer',
    transform: 'scale(1.01)',
    '& .MuiTableCell-root': {
      fontSize: '1.05rem',
    },
  },
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))
