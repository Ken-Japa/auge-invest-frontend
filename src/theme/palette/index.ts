import { PaletteOptions } from '@mui/material'
import { baseColors } from './baseColors'
/**
 * @const darkPalette
 * @description Paleta de cores específica para o tema escuro, estendendo as cores base e definindo cores para texto, fundo e divisores no modo escuro.
 */
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  ...baseColors,
  text: {
    primary: '#FFFFFF', // Texto principal em fundo escuro (Branco puro)
    secondary: '#B0BEC5', // Texto secundário em fundo escuro (Cinza azulado claro)
  },
  background: {
    default: '#121212', // Fundo principal do tema escuro (Preto quase puro - Material Design Dark)
    paper: '#1A2234', // Fundo de cards e elementos elevados (Azul muito escuro)
  },
  divider: 'rgba(255, 255, 255, 0.12)', // Divisores em tema escuro (Branco com 12% de opacidade)
}

/**
 * @const lightPalette
 * @description Paleta de cores específica para o tema claro, estendendo as cores base e definindo cores para texto, fundo e divisores no modo claro.
 */
export const lightPalette: PaletteOptions = {
  mode: 'light',
  ...baseColors,
  text: {
    primary: '#1A2234', // Texto principal em fundo claro (Azul muito escuro - mesmo que paper no tema escuro)
    secondary: '#637381', // Texto secundário em fundo claro (Cinza azulado médio)
  },
  background: {
    default: '#F5F8FA', // Fundo principal do tema claro (Cinza azulado muito claro)
    paper: '#FFFFFF', // Fundo de cards e elementos elevados (Branco puro)
  },
  divider: 'rgba(0, 0, 0, 0.12)', // Divisores em tema claro (Preto com 12% de opacidade)
}

/**
 * @const customColors
 * @description Objeto contendo cores personalizadas que não se encaixam diretamente na paleta padrão do Material-UI,
 * mas são usadas em componentes específicos, como tabelas de opções, cards e efeitos de hover.
 * As cores são definidas para os modos claro e escuro.
 */
export const customColors = {
  // Cores para tabelas de opções
  callHeader: {
    light: '#e6f7ff', // Fundo de cabeçalho de call em tema claro (Azul muito claro)
    dark: '#01579b', // Fundo de cabeçalho de call em tema escuro (Azul escuro profundo)
    text: {
      light: '#003366', // Texto de cabeçalho de call em tema claro (Azul marinho escuro)
      dark: '#ffffff', // Texto de cabeçalho de call em tema escuro (Branco puro)
    },
  },
  putHeader: {
    light: '#fff0f5', // Fundo de cabeçalho de put em tema claro (Rosa muito claro - Lavanda)
    dark: '#7b1fa2', // Fundo de cabeçalho de put em tema escuro (Roxo intenso)
    text: {
      light: '#660033', // Texto de cabeçalho de put em tema claro (Bordô escuro)
      dark: '#ffffff', // Texto de cabeçalho de put em tema escuro (Branco puro)
    },
  },
  strike: {
    light: '#f5f5f5', // Fundo de strike em tema claro (Cinza muito claro)
    dark: '#333333', // Fundo de strike em tema escuro (Cinza escuro)
  },
  // Cores para cards
  cardBackground: {
    light: '#ffffff', // Fundo de card em tema claro (Branco puro)
    dark: 'rgba(255, 255, 255, 0.05)', // Fundo de card em tema escuro (Branco com 5% de opacidade)
  },
  cardBorder: {
    light: '#e0e0e0', // Borda de card em tema claro (Cinza claro)
    dark: 'rgba(255, 255, 255, 0.1)', // Borda de card em tema escuro (Branco com 10% de opacidade)
  },
  // Efeitos hover
  hoverEffect: {
    light: '#f9f9f9', // Efeito hover em tema claro (Cinza quase branco)
    dark: 'rgba(255, 255, 255, 0.08)', // Efeito hover em tema escuro (Branco com 8% de opacidade)
  },
  accordionTitle: {
    light: '#1A2234', // Título de acordeão em tema claro (Azul muito escuro)
    dark: '#FFFFFF', // Título de acordeão em tema escuro (Branco puro)
  },
  accordionBody: {
    light: '#637381', // Corpo de acordeão em tema claro (Cinza azulado médio)
    dark: '#FFFFFF', // Corpo de acordeão em tema escuro (Branco puro)
  },
  walletItemBackground: {
    light: '#E0E0E0', // Fundo claro para o WalletItem
    dark: '#0A1929', // Fundo escuro para o WalletItem
  },
}
