import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { borderRadius, spacing, transitions } from '@/theme/variables'

export const JoinTeamForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,

  '& .form-container': {
    backgroundColor: visitorColors.backgroundLight,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    backdropFilter: visitorColors.blur,

    '@media (max-width: 600px)': {
      padding: `${spacing.md} ${spacing.sm}`,
    },
  },

  '& .MuiTextField-root': {
    marginBottom: spacing.sm,

    '& .MuiOutlinedInput-root': {
      color: visitorColors.text,
      backgroundColor: visitorColors.backgroundDark,

      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, theme.opacity.medium)',
      },
      '&.Mui-focused fieldset': {
        borderColor: visitorColors.primary,
      },
    },

    '& .MuiInputLabel-root': {
      color: visitorColors.textMuted,
      '&.Mui-focused': {
        color: visitorColors.primary,
      },
    },
  },

  '& .submit-button': {
    height: '56px',
    backgroundColor: visitorColors.primary,
    transition: transitions.medium,
    '&:hover': {
      backgroundColor: visitorColors.buttonPrimary,
    },
    '&:disabled': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      color: 'rgba(255, 255, 255, 0.3)',
    },
  },

  '& .MuiSelect-select': {
    color: visitorColors.text,
  },

  '& .menu-paper': {
    backgroundColor: visitorColors.backgroundDark,
    backdropFilter: visitorColors.blur,
    border: `1px solid ${visitorColors.primary}33`,

    '& .MuiMenuItem-root': {
      color: visitorColors.text,
      '&:hover': {
        backgroundColor: `${visitorColors.primary}59`,
      },
    },
  },
})
