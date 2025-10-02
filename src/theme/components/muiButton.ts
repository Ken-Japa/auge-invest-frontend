import { Components } from '@mui/material'

import { borderRadius, spacing, transitions } from '../variables'

export const muiButton: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      padding: `${spacing.xs} ${spacing.md}`,
      borderRadius: borderRadius.sm,
      textTransform: 'capitalize',
      transition: transitions.medium,
    },
    contained: {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    outlined: {
      borderWidth: '1px',
      '&:hover': {
        borderWidth: '1px',
      },
    },
  },
}
