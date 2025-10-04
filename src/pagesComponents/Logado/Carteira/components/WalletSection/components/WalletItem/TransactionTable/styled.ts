import { Table, TableCell, TableHead } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius } from '@/theme/variables'

export const StyledTransactionTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderRadius: borderRadius.md,
}))

export const StyledTransactionTableHead = styled(TableHead)(({ theme }) => ({
  background: theme.palette.primary.dark,
}))

export const StyledTransactionHeaderTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}))
