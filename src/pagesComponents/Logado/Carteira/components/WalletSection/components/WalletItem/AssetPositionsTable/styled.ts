import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledAssetTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

export const StyledAssetTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}))

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#000000',
}))

export const StyledAssetHeaderTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}))

export const StyledAssetTableHeaderCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 'bold',
  color: '#ffffff',
}))
