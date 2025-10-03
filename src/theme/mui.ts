import { createTheme, Theme } from '@mui/material/styles'

/**
 * @module @mui/material/styles
 * @description Extensão dos tipos de tema do Material-UI para incluir estilos personalizados para gráficos.
 * Isso permite a definição de propriedades específicas para tooltips de gráficos diretamente no objeto de tema.
 */
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

/**
 * @const commonOptions
 * @description Objeto de configuração comum para ambos os temas (claro e escuro).
 * Define configurações de tipografia, forma (borderRadius), componentes e estilos de gráfico que são compartilhados.
 */
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

/**
 * @const darkTheme
 * @description Tema escuro configurado para a aplicação, combinando as opções comuns com a paleta de cores escura.
 */
export const darkTheme: Theme = createTheme({
  ...commonOptions,
  palette: darkPalette,
})

/**
 * @const lightTheme
 * @description Tema claro configurado para a aplicação, combinando as opções comuns com a paleta de cores clara.
 */
export const lightTheme: Theme = createTheme({
  ...commonOptions,
  palette: lightPalette,
})
