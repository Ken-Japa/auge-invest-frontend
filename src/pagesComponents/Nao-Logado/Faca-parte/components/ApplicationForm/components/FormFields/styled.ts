import { visitorColors } from '@/theme/palette/visitor'

export const selectStyles = {
  MenuProps: {
    classes: { paper: 'menu-paper' },
    PaperProps: {
      sx: {
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
    },
  },
  sx: {
    backgroundColor: visitorColors.backgroundDark,
    color: visitorColors.text,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: visitorColors.primary,
    },
    '& .MuiSelect-icon': {
      color: visitorColors.textMuted,
    },
  },
}
