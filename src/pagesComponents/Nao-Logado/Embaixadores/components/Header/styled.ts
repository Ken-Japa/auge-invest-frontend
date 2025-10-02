import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'

export const HeaderContainer = styled(Stack)({
  textAlign: 'center',
  alignItems: 'center',

  '& .header-title': {
    color: visitorColors.gold,
    fontWeight: 'bold',
  },

  '& .header-subtitle': {
    color: visitorColors.text,
  },

  '& .header-description': {
    color: `${visitorColors.text}cc`,
    maxWidth: '32rem',
  },
})

export const HeaderIcon = styled(WorkspacePremiumIcon)({
  fontSize: 60,
  color: visitorColors.gold,
})
