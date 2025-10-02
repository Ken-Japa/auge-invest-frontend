import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { spacing } from '@/theme/variables'

export const HeaderContainer = styled('div')({
  textAlign: 'center',
  marginBottom: spacing.xl,

  '& .header-icon-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },

  '& .header-subtitle': {
    color: visitorColors.textSecondary,
    marginBottom: spacing.xs,
  },

  '& .header-description': {
    color: visitorColors.textSecondary,
    maxWidth: '32rem',
    margin: `${spacing.md} auto 0`,
    textAlign: 'center',
  },

  '@media (max-width: 600px)': {
    marginBottom: spacing.lg,
  },
})
