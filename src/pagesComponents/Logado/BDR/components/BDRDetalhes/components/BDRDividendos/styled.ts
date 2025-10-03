import {
  Box,
  Chip as MuiChip,
  Paper,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const DividendContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}))

export const DividendPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[6],
  backgroundColor: theme.palette.background.paper,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.divider}`,
}))

export const TableContainer = styled(MuiTableContainer)({
  maxHeight: '400px',
  overflowY: 'auto',
})

export const Table = styled(MuiTable)({
  minWidth: 650,
})

export const TableHead = styled(MuiTableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  '& th': {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
  },
}))

export const TableBody = styled(MuiTableBody)({})

export const TableRow = styled(MuiTableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}))

export const TableCell = styled(MuiTableCell)({
  fontSize: '0.875rem',
  textAlign: 'center',
})

export const HeaderCell = styled(MuiTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}))

export const StatusChip = styled(MuiChip)(({ theme, color }) => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
}))

export const NoDataContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const LoadingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}))

export const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.error.main,
}))

export const DividendTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  fontSize: '1.8rem',
  textAlign: 'center',
}))

export const DividendSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}))

export const SummaryItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  minWidth: '150px',
  flex: '1 1 auto',
}))

export const SummaryLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
}))

export const SummaryValue = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '1.1rem',
  color: theme.palette.text.primary,
}))
