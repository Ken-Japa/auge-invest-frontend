import { FormControlLabel, Link } from '@mui/material'
import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { transitions } from '@/theme/variables'

export const StyledFormControlLabel = styled(FormControlLabel)({
  '& .MuiCheckbox-root': {
    color: `${visitorColors.text}e6`,
    '&.Mui-checked': {
      color: visitorColors.primary,
    },
  },

  '& .MuiTypography-root': {
    color: `${visitorColors.text}e6`,
    fontSize: '0.875rem',
  },
})

export const StyledLink = styled(Link)({
  color: visitorColors.primary,
  textDecoration: 'underline',
  transition: transitions.medium,

  '&:hover': {
    opacity: 0.9,
  },
})
