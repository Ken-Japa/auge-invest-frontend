import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MapaArvoreContainer = styled(Box)(({ theme }) => ({
  width: '60vw',
  height: '800px',
  flex: 1,
  minHeight: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  '& .tradingview-widget-copyright': {
    display: 'none',
  },
}))

export const WidgetWrapper = styled('div')({
  width: '100%',
  maxWidth: '100%',
  height: '700px',
  position: 'relative',
})

export const TradingViewWidgetContainer = styled('div')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
})
