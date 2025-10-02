import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
  transition: transitions.medium,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2234' : '#edf1f5',
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2A3244' : '#f5f7fa',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const StyledAssetTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'italic',
}))
