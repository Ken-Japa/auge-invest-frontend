import GroupsIcon from '@mui/icons-material/Groups'
import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { spacing } from '@/theme/variables'

export const HeaderContainer = styled('div')({
  '& .header-content': {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,

    '@media (max-width: 900px)': {
      justifyContent: 'center',
    },
  },

  '& .title': {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: visitorColors.primary,

    '@media (max-width: 600px)': {
      fontSize: '2rem',
    },
  },

  '& .subtitle': {
    color: visitorColors.textSecondary,
    marginBottom: spacing.lg,

    '@media (max-width: 900px)': {
      textAlign: 'center',
    },
  },
})

export const HeaderIcon = styled(GroupsIcon)({
  fontSize: 60,
  color: visitorColors.primary,
})
