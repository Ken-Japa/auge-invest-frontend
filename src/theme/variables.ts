import { customColors } from './palette'
// Variáveis de tema centralizadas para uso em styled components e componentes MUI

// Espaçamento - Sistema de espaçamento consistente para margens e paddings
export const spacing = {
  xs: '0.25rem', // Extra pequeno - Para espaçamentos mínimos e compactos
  sm: '0.5rem', // Pequeno - Para espaçamentos internos em componentes pequenos
  md: '1rem', // Médio - Espaçamento padrão para a maioria dos componentes
  lg: '1.5rem', // Grande - Para separação entre seções ou componentes maiores
  xl: '2rem', // Extra grande - Para margens maiores e separação de blocos
  xxl: '3rem', // Extra extra grande - Para espaçamentos muito grandes entre seções
}

// Bordas - Sistema de arredondamento de bordas para consistência visual
export const borderRadius = {
  xs: '4px', // Extra pequeno - Para botões pequenos e chips
  sm: '8px', // Pequeno - Para a maioria dos componentes (botões, inputs)
  md: '12px', // Médio - Para cards e painéis
  lg: '16px', // Grande - Para modais e diálogos
  xl: '24px', // Extra grande - Para componentes destacados
  circle: '50%', // Circular - Para avatares e botões circulares
  full: '9999px', // Borda completamente arredondada para elementos como pílulas
}

// Padding - Combinações comuns de padding para diferentes componentes
export const padding = {
  xs: spacing.xs, // Extra pequeno
  sm: spacing.sm, // Pequeno
  md: spacing.md, // Médio
  lg: spacing.lg, // Grande
  xl: spacing.xl, // Extra grande
  xxl: spacing.xxl, // Extra extra grande
  // Combinações comuns
  button: `${spacing.xs} ${spacing.md}`, // Padding padrão para botões (vertical menor, horizontal maior)
  card: spacing.md, // Padding interno para cards
  section: spacing.lg, // Padding para seções da página
  container: `${spacing.md} ${spacing.lg}`, // Padding para containers (vertical médio, horizontal grande)
  input: `${spacing.sm} ${spacing.md}`, // Padding para campos de entrada (vertical pequeno, horizontal médio)
}

// Tipografia - Definições de fontes, tamanhos e pesos
export const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Família de fontes padrão
  fontSizes: {
    xs: '0.75rem', // 12px - Para textos muito pequenos, legendas
    sm: '0.875rem', // 14px - Para textos secundários, subtítulos
    md: '1rem', // 16px - Tamanho base para a maioria dos textos
    lg: '1.25rem', // 20px - Para títulos de seção menores
    xl: '1.5rem', // 24px - Para títulos de seção
    xxl: '2rem', // 32px - Para títulos principais
  },
  fontWeights: {
    light: 300, // Para textos mais leves e sutis
    regular: 400, // Peso padrão para a maioria dos textos
    medium: 500, // Para subtítulos e textos destacados
    bold: 700, // Para títulos e elementos enfatizados
  },
}

// Sombras - Sistema de elevação com sombras para indicar profundidade
export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', // Pequena - Para elementos sutilmente elevados
  md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', // Média - Para cards e elementos interativos
  lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', // Grande - Para modais e elementos flutuantes
  xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)', // Extra grande - Para elementos destacados
}

// Transições - Tempos de transição para animações e efeitos
export const transitions = {
  fast: '0.2s ease', // Rápida - Para feedback imediato (hover, focus)
  medium: '0.3s ease', // Média - Para a maioria das transições
  slow: '0.5s ease', // Lenta - Para transições mais elaboradas
}

// Breakpoints - Pontos de quebra para design responsivo
export const breakpoints = {
  xs: '0px', // Extra pequeno - Celulares pequenos
  sm: '600px', // Pequeno - Celulares grandes e tablets pequenos
  md: '960px', // Médio - Tablets e notebooks pequenos
  lg: '1280px', // Grande - Notebooks e desktops
  xl: '1920px', // Extra grande - Monitores grandes e TVs
}

/**
 * @function getThemeColor
 * @description Função auxiliar para obter uma cor específica do tema, baseada no modo (claro/escuro) e no caminho da cor.
 * @param {any} theme - O objeto de tema atual, contendo informações sobre o modo da paleta.
 * @param {string} colorPath - O caminho da cor desejada dentro do objeto customColors (ex: 'primary.main').
 * @returns {string} A string da cor correspondente ao caminho e ao modo do tema.
 */
export const getThemeColor = (theme: any, colorPath: string) => {
  const mode = theme.palette.mode // 'light' ou 'dark'
  const parts = colorPath.split('.')

  let color: any = customColors
  for (let i = 0; i < parts.length - 1; i++) {
    color = color[parts[i]]
  }

  return color[parts[parts.length - 1]][mode]
}

/**
 * @function getSpacing
 * @description Função auxiliar para obter um valor de espaçamento predefinido.
 * @param {keyof typeof spacing} size - O tamanho do espaçamento desejado (ex: 'md', 'lg').
 * @returns {string} O valor da string de espaçamento correspondente.
 */
export const getSpacing = (size: keyof typeof spacing) => spacing[size]

/**
 * @function getBorderRadius
 * @description Função auxiliar para obter um valor de raio de borda predefinido.
 * @param {keyof typeof borderRadius} size - O tamanho do raio de borda desejado (ex: 'sm', 'circle').
 * @returns {string} O valor da string do raio de borda correspondente.
 */
export const getBorderRadius = (size: keyof typeof borderRadius) => borderRadius[size]
