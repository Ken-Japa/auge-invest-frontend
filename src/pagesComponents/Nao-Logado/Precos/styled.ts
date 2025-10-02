import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { spacing } from '@/theme/variables'

export const SectionPricing = styled('section')({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',

  '& .background-image': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },

  '& .opacity': {
    position: 'relative',
    zIndex: 1,
    backgroundColor: visitorColors.overlayS,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
})

export const BaseSection = styled('section')(({ theme }) => ({
  padding: `${spacing.xxl} ${spacing.md}`,

  [theme.breakpoints.down('sm')]: {
    padding: `${spacing.xl} ${spacing.sm}`,
  },
}))

export const ContentWrapper = styled(Stack)({
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
})
