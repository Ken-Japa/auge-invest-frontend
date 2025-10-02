import { styled } from '@mui/material/styles'

import { PageTransition } from '@/components/Helpers/PageTransition'
import { visitorColors } from '@/theme/palette/visitor'

export const EmbaixadoresSection = styled('main')<{ footerHeight?: number }>(({ footerHeight = 0 }) => ({
  minHeight: '100vh',
  position: 'relative',
  paddingBottom: `calc(${visitorColors.paddingPage} + ${footerHeight}px)`,
  paddingTop: visitorColors.paddingTop,
  display: 'flex',
  flexDirection: 'column',

  '& .background-container': {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    willChange: 'transform',
  },

  '& .overlay': {
    position: 'absolute',
    inset: 0,
    backgroundColor: visitorColors.overlayS,
    backdropFilter: visitorColors.blur,
  },
}))

export const StyledPageTransition = styled(PageTransition)({
  width: '100%',
})

export const BackgroundImage = styled('div')<{ isLoaded: boolean }>(({ isLoaded }) => ({
  position: 'relative',
  filter: !isLoaded ? 'grayscale(1)' : 'none',
  transition: 'filter 0.3s ease-in-out',
  width: '100%',
  height: '100%',
}))
