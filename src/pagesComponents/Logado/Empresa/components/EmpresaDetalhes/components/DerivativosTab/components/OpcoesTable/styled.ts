import { Box, TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TableContainer = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'black',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
}))

export const StrikeTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#f5f5f5',
  color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'black',
  textAlign: 'center',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
}))

export const CallHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#e6f7ff',
  color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : '#003366',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
}))

export const PutHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.error.dark : '#fff0f5',
  color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : '#660033',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#e0e0e0'}`,
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.hover : '#f9f9f9',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
}))

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'black',
}))

export const PaginationButton = styled('button')<{ disabled: boolean }>(({ theme, disabled }) => ({
  padding: '4px 8px',
  marginRight: '4px',
  cursor: disabled ? 'default' : 'pointer',
  opacity: disabled ? 0.5 : 1,
  border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : '#ccc'}`,
  borderRadius: '4px',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
  color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'black',
}))
