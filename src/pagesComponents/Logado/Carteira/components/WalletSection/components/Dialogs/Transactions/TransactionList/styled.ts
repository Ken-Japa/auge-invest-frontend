import { TableCell, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}))

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
  transition: transitions.medium,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.paper,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const StyledAssetTableHeaderCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 'bold',
  color: theme.palette.primary.contrastText,
}))
