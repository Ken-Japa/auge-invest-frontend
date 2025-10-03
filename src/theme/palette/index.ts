import { PaletteOptions } from '@mui/material'

/**
 * @module @mui/material/styles
 * @description Extensão dos tipos de paleta do Material-UI para incluir variações de cores personalizadas (A100, A200, A400).
 * Isso permite a definição de cores adicionais para estados como hover, active, etc., além das cores principais.
 */
declare module '@mui/material/styles' {
  interface PaletteColor {
    A100?: string
    A200?: string
    A400?: string
  }

  interface SimplePaletteColorOptions {
    A100?: string
    A200?: string
    A400?: string
  }
}

/**
 * @const baseColors
 * @description Objeto contendo as definições de cores base que são comuns para ambos os temas (claro e escuro).
 * Inclui as paletas de cores primária, secundária, info, warning, success e error, com suas respectivas variações.
 */
const baseColors = {
  primary: {
    main: '#0D95F9', // Azul principal da marca (Azul céu brilhante)
    A100: '#7DC5FC', // Azul claro para hover e elementos secundários (Azul céu claro)
    A200: '#0068BA', // Azul escuro para elementos ativos e destaques (Azul marinho médio)
    contrastText: '#FFFFFF', // Texto sobre fundo azul (Branco puro)
  },
  secondary: {
    main: '#8411CC', // Roxo principal para elementos secundários (Roxo violeta intenso)
    A100: '#A45AD3', // Roxo claro para hover (Lilás médio)
    A200: '#510083', // Roxo escuro para elementos ativos (Roxo escuro profundo)
    A300: '#3f0069', // Roxo mais escuro para hover (Roxo violeta escuro)
    contrastText: '#502E6C', // Texto sobre fundo roxo (Roxo acinzentado escuro)
  },
  info: {
    main: '#0D95F9', // Azul informativo (Azul céu brilhante - igual ao primary.main)
    A100: '#7DC5FC', // Azul claro para alertas informativos (Azul céu claro)
    A200: '#0068BA', // Azul escuro para ícones informativos (Azul marinho médio)
    contrastText: '#004C86', // Texto sobre fundo azul informativo (Azul marinho escuro)
  },
  warning: {
    main: '#FFA500', // Laranja para alertas (Laranja âmbar)
    A100: '#FCC052', // Laranja claro para hover em alertas (Laranja pastel)
    A200: '#C98302', // Laranja escuro para elementos ativos (Laranja acastanhado)
    contrastText: '#804D00', // Texto sobre fundo laranja (Marrom alaranjado escuro)
  },
  success: {
    main: '#4CAF50', // Verde para indicar sucesso e valores positivos (Verde médio)
    A100: '#A5D6A7', // Verde claro para hover (Verde menta claro)
    A200: '#2E7D32', // Verde escuro para elementos ativos (Verde floresta)
    contrastText: '#1B5E20', // Texto sobre fundo verde (Verde escuro profundo)
  },
  error: {
    main: '#FF0000', // Vermelho para erros e valores negativos (Vermelho puro)
    A100: '#F35D5D', // Vermelho claro para hover (Vermelho coral)
    A200: '#B80404', // Vermelho escuro para elementos ativos (Vermelho escuro)
    contrastText: '#860000', // Texto sobre fundo vermelho (Vermelho sangue escuro)
  },
}

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
