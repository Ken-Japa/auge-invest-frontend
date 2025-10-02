import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { memo, useEffect, useRef, useState } from 'react'

const CalendarioComponent: React.FC = () => {
  const container = useRef<HTMLDivElement>(null)
  const [widgetId] = useState(`tv-calendar-${Math.random().toString(36).substring(2, 9)}`)
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  useEffect(() => {
    if (!container.current) return
    const currentContainer = container.current

    currentContainer.innerHTML = `
            <div class="tradingview-widget-container__widget" id="${widgetId}"></div>
            <div class="tradingview-widget-copyright"></div>
        `

    // Add the script with a slight delay to ensure DOM is ready
    const scriptTimeout = setTimeout(() => {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
      script.type = 'text/javascript'
      script.async = true
      script.innerHTML = JSON.stringify({
        container_id: widgetId,
        width: '100%',
        height: '100%',
        colorTheme: isDarkMode ? 'dark' : 'light',
        isTransparent: false,
        locale: 'br',
        importanceFilter: '-1,0,1',
        countryFilter: 'br',
      })

      currentContainer.appendChild(script)
    }, 200)

    return () => {
      clearTimeout(scriptTimeout)
      currentContainer.innerHTML = ''
    }
  }, [widgetId, isDarkMode])

  return (
    <Box
      sx={{
        width: '100%',
        height: '400px',
        '& .tradingview-widget-copyright': {
          display: 'none',
        },
        '& .tradingview-widget-container': {
          width: '100%',
          height: '100%',
          position: 'relative',
        },
        '& .tradingview-widget-container__widget': {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <div className="tradingview-widget-container" ref={container}></div>
    </Box>
  )
}

export const Calendario = memo(CalendarioComponent)
Calendario.displayName = 'Calendario'
