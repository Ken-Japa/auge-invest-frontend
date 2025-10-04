import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing } from '@/theme/variables'

export const StyledAssetTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: spacing.md,
}))

export const StyledAssetTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}))

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}))

export const StyledAssetHeaderTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}))

export const StyledAssetTableHeaderCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 'bold',
  color: theme.palette.primary.contrastText,
}))
