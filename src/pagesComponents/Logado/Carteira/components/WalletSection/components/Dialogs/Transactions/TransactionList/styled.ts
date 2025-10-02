import { TableCell, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#000000',
}))

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
  transition: transitions.medium,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2234' : '#F5F5F5',
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2A3244' : '#F5F5F5',
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const StyledAssetTableHeaderCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 'bold',
  color: '#fff',
}))
