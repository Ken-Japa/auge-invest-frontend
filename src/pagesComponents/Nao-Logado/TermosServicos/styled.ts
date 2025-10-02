import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { spacing } from '@/theme/variables'

export const SectionTermsServices = styled('section')({
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  '& .background-image': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },

  '& .opacity-layer': {
    position: 'relative',
    zIndex: 1,
    backgroundColor: visitorColors.backgroundOverlay,
    backdropFilter: visitorColors.blur,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  '& .content-wrapper': {
    padding: `${spacing.xl} 0`,
    position: 'relative',
    flex: 1,

    '@media (max-width: 600px)': {
      padding: `${spacing.lg} 0`,
    },
  },

  '& .MuiFade-root': {
    position: 'fixed',
    zIndex: 4,
  },
})
