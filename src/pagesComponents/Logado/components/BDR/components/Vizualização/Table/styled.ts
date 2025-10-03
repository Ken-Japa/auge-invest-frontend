import {
  Table as MuiTable,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[6],
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
}))

export const StyledTable = styled(MuiTable)({
  minWidth: 650,
})

export const StyledTableHead = styled(MuiTableHead)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}))

export const HeaderRow = styled(MuiTableRow)({
  '& th': {
    fontWeight: 'bold',
  },
})

export const HeaderCell = styled(MuiTableCell)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 700,
  color: theme.palette.text.primary,
  padding: theme.spacing(1.5),
}))

export const DataRow = styled(MuiTableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const DataCell = styled(MuiTableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
}))

export const BDRName = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1rem',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}))

export const CodeChip = styled('span')(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(0.75, 1.25),
  margin: theme.spacing(0.25),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.primary.main,
  border: 'none',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
}))

export const DataText = styled(Typography)({
  fontSize: '0.9rem',
})
