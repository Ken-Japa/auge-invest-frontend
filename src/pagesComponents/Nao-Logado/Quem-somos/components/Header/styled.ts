import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { spacing } from '@/theme/variables'

export const HeaderContainer = styled('div')({
  textAlign: 'center',
  position: 'relative',

  '& .title': {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: visitorColors.primary,
    marginBottom: spacing.xl,
  },
})
