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
import { muiTypography } from './components/muiTypography'
import { darkPalette, lightPalette, customColors } from './palette'
import { borderRadius, shadows } from './variables'
const commonOptions = {
  typography: muiTypography,
  shape: {
    borderRadius: parseInt(borderRadius.md),
  },
  components,
}

/**
 * @const darkTheme
 * @description Tema escuro configurado para a aplicação, combinando as opções comuns com a paleta de cores escura.
 */
export const darkTheme: Theme = createTheme({
  ...commonOptions,
  palette: darkPalette,
  chartStyles: {
    tooltip: {
      background: customColors.cardBackground.dark,
      border: `1px solid ${customColors.cardBorder.dark}`,
      borderRadius: borderRadius.xs,
      boxShadow: shadows.md,
    },
  },
})

/**
 * @const lightTheme
 * @description Tema claro configurado para a aplicação, combinando as opções comuns com a paleta de cores clara.
 */
export const lightTheme: Theme = createTheme({
  ...commonOptions,
  palette: lightPalette,
  chartStyles: {
    tooltip: {
      background: customColors.cardBackground.light,
      border: `1px solid ${customColors.cardBorder.light}`,
      borderRadius: borderRadius.xs,
      boxShadow: shadows.md,
    },
  },
})
