import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { borderRadius, spacing } from '@/theme/variables'

export const ContentContainer = styled('div')({
  maxWidth: '1024px',
  width: '100%',
  margin: '0 auto',
  color: visitorColors.text,

  '& .privacy-section': {
    marginBottom: spacing.md,
    backgroundColor: visitorColors.backgroundLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backdropFilter: visitorColors.blur,

    '@media (max-width: 600px)': {
      padding: spacing.sm,
    },
  },

  '& .section-title': {
    fontSize: '1.5rem',
    color: visitorColors.primary,
    marginBottom: spacing.md,
  },

  '& .warning-text': {
    color: '#f59e0b', // Amber warning color
  },

  '& p': {
    marginBottom: spacing.md,
    lineHeight: 1.6,
  },

  '& ul': {
    paddingLeft: spacing.md,
    marginBottom: spacing.md,
  },

  '& li': {
    marginBottom: spacing.xs,
  },
})
