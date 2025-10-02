import { Table, TableSortLabel, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  '&:hover': {
    opacity: 0.8,
  },
  '& .MuiTableSortLabel-icon': {
    opacity: 0.5,
  },
  color: theme.palette.text.primary,
}))

export const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  tableLayout: 'fixed',
  '& .MuiTableCell-root': {
    boxShadow: 'none',
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
}))

export const IndustriaTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}))

export const SegmentoTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
}))

export const ValueText = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}))

export const PercentageText = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}))
