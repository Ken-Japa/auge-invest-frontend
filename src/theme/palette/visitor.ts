import { visitorPalette } from './visitorPalette'

/**
 * @const visitorColors
 * @description Objeto contendo uma paleta de cores específica para visitantes ou para um tema alternativo,
 * incluindo cores principais, secundárias, de destaque, de status (sucesso, erro, aviso, informação),
 * cores para fundos com transparência, textos e elementos de UI.
 */
export const visitorColors = {
  ...visitorPalette,
  // Backgrounds com transparência
  backgroundOverlay: 'rgba(0, 0, 0, 0.6)', // Overlay escuro (Preto 60%) - Para modais e overlays
  backgroundLight: 'rgba(255, 255, 255, 0.05)', // Fundo claro (Branco 5%) - Para elementos sutis
  backgroundMedium: 'rgba(255, 255, 255, 0.08)', // Fundo médio (Branco 8%) - Para cards e painéis
  backgroundDark: 'rgba(0, 0, 0, 0.6)', // Fundo escuro (Preto 60%) - Para elementos destacados
  backgroundGradient: 'linear-gradient(180deg, #000000 0%, #001529 100%)', // Gradiente (Preto para Azul escuro) - Para fundos dinâmicos
  backgroundPrimary: 'rgba(13, 149, 249, 0.1)', // Fundo primário (Azul 10%) - Para destacar áreas relacionadas à cor primária
  skeletonBackground: 'bg-[#ffffff0a]', // Fundo de skeleton (Branco 4%) - Para estados de carregamento

  // Textos
  text: '#FFFFFF', // Texto principal (Branco puro) - Para a maioria dos textos
  textSecondary: 'rgba(255, 255, 255, 0.8)', // Texto secundário (Branco 80%) - Para textos menos importantes
  textMuted: 'rgba(255, 255, 255, 0.6)', // Texto atenuado (Branco 60%) - Para textos de menor importância

  // Elementos de UI
  divider: 'rgba(255, 255, 255, 0.2)', // Divisor (Branco 20%) - Para separar seções
  cardBackground: 'rgba(0, 0, 0, 0.5)', // Fundo de card (Preto 50%) - Para cards e painéis
  buttonPrimary: '#0056b3', // Botão primário (Azul escuro) - Para botões principais
  buttonSecondary: '#3A1078', // Botão secundário (Roxo escuro) - Para botões secundários
  borderLight: 'rgba(255, 255, 255, 0.1)', // Borda clara (Branco 10%) - Para bordas sutis

  // Efeitos
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay padrão (Preto 50%) - Para sobreposições
  overlayS: 'rgba(0, 0, 0, 0.3)', // Overlay suave (Preto 30%) - Para sobreposições mais leves
  overlayG: 'rgba(0, 0, 0, 0.7)', // Overlay forte (Preto 70%) - Para sobreposições mais intensas
  blur: 'blur(8px)', // Efeito de desfoque - Para elementos de fundo

  // Paddings
  paddingPage: '4rem', // Padding de página - Para margens externas da página
  paddingTop: '2rem', // Padding superior - Para espaçamento superior consistente
}
