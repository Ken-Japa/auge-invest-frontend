import { Card, ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, customColors, shadows } from '@/theme/variables'

export const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: 2,
  boxShadow: shadows.md,
  border: `1px solid ${customColors.cardBorder[theme.palette.mode]}`, 
  borderRadius: borderRadius.sm,
  backgroundColor: customColors.cardBackground[theme.palette.mode],
}))

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: customColors.hoverEffect[theme.palette.mode],
  },
}))