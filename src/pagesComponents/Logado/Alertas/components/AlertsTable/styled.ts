import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.triggered-alert': {
    backgroundColor: theme.palette.warning.light,
    '&:hover': {
      backgroundColor: theme.palette.warning.main,
    },
  },
}))

export const StyledTableCell = styled(TableCell)(() => ({
  '& .price-value': {
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  '& .action-buttons': {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
}))
