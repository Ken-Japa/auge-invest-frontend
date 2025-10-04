import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, typography } from '@/theme/variables'

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
    fontWeight: typography.fontWeights.medium,
    fontSize: typography.fontSizes.lg,
  },
  '& .action-buttons': {
    display: 'flex',
    gap: spacing.sm,
    justifyContent: 'center',
  },
}))
