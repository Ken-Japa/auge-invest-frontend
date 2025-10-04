import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
  transition: transitions.medium,
  '&:nth-of-type(odd)': {
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[100],
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[50],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const StyledAssetTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'italic',
}))
