import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTransactionTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const StyledTransactionTableCell = styled(TableCell)(() => ({
  padding: '6px 16px',
}))
