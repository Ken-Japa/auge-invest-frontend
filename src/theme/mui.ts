import { createTheme, Theme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    chartStyles: {
      tooltip: {
        background: string
        border: string
        borderRadius: string
        boxShadow: string
      }
    }
  }
  interface ThemeOptions {
    chartStyles?: {
      tooltip?: {
        background?: string
        border?: string
        borderRadius?: string
        boxShadow?: string
      }
    }
  }
}

import { components } from './components'
import { darkPalette, lightPalette } from './palette'
import { borderRadius, typography } from './variables'

// Configurações comuns para ambos os temas
const commonOptions = {
  typography: {
    fontFamily: typography.fontFamily,
    h1: {
      fontSize: typography.fontSizes.xxl,
      fontWeight: typography.fontWeights.bold,
    },
    h2: {
      fontSize: typography.fontSizes.xl,
      fontWeight: typography.fontWeights.bold,
    },
    h3: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.medium,
    },
    h4: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
    },
    h5: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
    },
    h6: {
      fontSize: typography.fontSizes.xs,
      fontWeight: typography.fontWeights.medium,
    },
    body1: {
      fontSize: typography.fontSizes.md,
    },
    body2: {
      fontSize: typography.fontSizes.sm,
    },
  },
  shape: {
    borderRadius: parseInt(borderRadius.sm),
  },
  components,
  chartStyles: {
    tooltip: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
    },
  },
}

// Criar os temas
export const darkTheme: Theme = createTheme({
  ...commonOptions,
  palette: darkPalette,
})

export const lightTheme: Theme = createTheme({
  ...commonOptions,
  palette: lightPalette,
})
