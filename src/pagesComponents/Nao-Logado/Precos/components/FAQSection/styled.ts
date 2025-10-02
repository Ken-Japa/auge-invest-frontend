import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { borderRadius, spacing, transitions } from '@/theme/variables'

export const FAQContainer = styled('div')({
  backgroundColor: visitorColors.backgroundLight,
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  borderRadius: borderRadius.md,
  padding: spacing.md,

  '& .faq-item': {
    backgroundColor: visitorColors.overlay,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    border: `1px solid ${visitorColors.divider}`,
    marginBottom: spacing.md,
    transition: transitions.medium,

    '&:hover': {
      backgroundColor: visitorColors.backgroundMedium,
      borderColor: visitorColors.primary,
    },

    '&:last-child': {
      marginBottom: 0,
    },

    '& .question': {
      color: visitorColors.primary,
      marginBottom: spacing.sm,
      fontSize: '1.1rem',
    },

    '& .answer': {
      color: visitorColors.text,
    },
  },
})
