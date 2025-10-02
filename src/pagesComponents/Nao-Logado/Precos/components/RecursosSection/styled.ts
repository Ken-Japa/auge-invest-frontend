import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { borderRadius, spacing, transitions } from '@/theme/variables'

export const RecursosContainer = styled('div')(({ theme }) => ({
  backgroundColor: visitorColors.overlay,
  width: '100%',
  padding: spacing.lg,
  borderRadius: borderRadius.md,
  transition: transitions.medium,

  '&:hover': {
    backgroundColor: visitorColors.backgroundMedium,
  },

  '& .recursos-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.xl,
    marginBottom: spacing.xl,
    width: '100%',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },

  '& .recurso-item': {
    display: 'flex',
    alignItems: 'center',
    color: visitorColors.textSecondary,

    '& .icon': {
      color: visitorColors.primary,
      marginRight: spacing.sm,
    },
  },

  '& .link-container': {
    textAlign: 'center',
  },

  '& .more-link': {
    color: visitorColors.primary,
    textDecoration: 'none',
    transition: transitions.medium,

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
