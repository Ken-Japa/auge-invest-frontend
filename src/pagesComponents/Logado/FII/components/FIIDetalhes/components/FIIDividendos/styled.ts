import {
  Box,
  Chip as MuiChip,
  Paper,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, shadows, spacing, typography } from '@/theme/variables'

export const DividendContainer = styled(Box)(({ theme }) => ({
  marginTop: spacing.xxl,
  marginBottom: spacing.xxl,
  display: 'flex',
}))

export const DividendPaper = styled(Paper)(({ theme }) => ({
  padding: spacing.lg,
  borderRadius: borderRadius.sm,
  boxShadow: shadows.md,
}))

export const TableContainer = styled(MuiTableContainer)({
  overflowY: 'auto',
  display: 'flex',
  borderRadius: borderRadius.md,
})

export const Table = styled(MuiTable)({
  minWidth: 650,
})

export const TableHead = styled(MuiTableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& th': {
    color: theme.palette.primary.contrastText,
    fontWeight: typography.fontWeights.bold,
  },
}))

export const TableBody = styled(MuiTableBody)({})

export const TableRow = styled(MuiTableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}))

export const TableCell = styled(MuiTableCell)({
  fontSize: typography.fontSizes.sm,
  textAlign: 'center',
})

export const HeaderCell = styled(MuiTableCell)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: typography.fontWeights.bold,
}))

export const StatusChip = styled(MuiChip)(({ theme, color }) => ({
  fontWeight: typography.fontWeights.bold,
  fontSize: typography.fontSizes.xs,
}))

export const NoDataContainer = styled(Box)(({ theme }) => ({
  padding: spacing.xxl,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const LoadingContainer = styled(Box)(({ theme }) => ({
  padding: spacing.xxl,
  textAlign: 'center',
}))

export const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: spacing.md,
  color: theme.palette.error.main,
}))

export const DividendTitle = styled(Typography)(({ theme }) => ({
  marginBottom: spacing.md,
  fontWeight: theme.typography.fontWeightMedium,
  textAlign: 'center',
}))

export const DividendSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  marginBottom: spacing.lg,
  gap: spacing.md,
}))

export const SummaryItem = styled(Box)(({ theme }) => ({
  padding: spacing.md,
  backgroundColor: theme.palette.background.paper,
  borderRadius: borderRadius.sm,
  boxShadow: shadows.sm,
  minWidth: '150px',
  flex: '1 1 auto',
}))

export const SummaryLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: typography.fontSizes.sm,
}))

export const SummaryValue = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: typography.fontSizes.lg,
  color: theme.palette.primary.main,
}))
