import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, spacing } from '@/theme/variables'

export const TableWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: borderRadius.md,
  boxShadow: theme.shadows[1],
  overflow: 'hidden',

  '& .MuiTableCell-root': {
    padding: spacing.md,
  },

  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],

    '& .MuiTableCell-root': {
      fontWeight: 600,
      color: theme.palette.text.primary,
    },
  },

  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },

    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },

    '& .asset-name': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
    },

    '& .percentage': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
    },

    '& .price-value': {
      fontWeight: 500,
    },
  },

  '& .action-buttons': {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing.sm,
  },
}))

export const NoDataMessage = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: spacing.xl,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: borderRadius.md,
  boxShadow: theme.shadows[1],
}))
