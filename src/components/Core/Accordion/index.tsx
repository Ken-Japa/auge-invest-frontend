import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import { ReactNode } from 'react'

import { useTheme } from '@/theme/ThemeContext'

import {
  darkTheme,
  lightTheme,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from './styled'

interface Props {
  title: string
  children?: ReactNode
  body?: string
  variant?: 'light' | 'dark'
  className?: string
  titleColor?: string
  bodyColor?: string
  customBackground?: string
  customBorderColor?: string
  customTitleColor?: string
  customContentBackground?: string
  expanded?: boolean
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void
}

/**
 * @typedef {object} Props
 * @property {string} title - O título do acordeão.
 * @property {ReactNode} [children] - Conteúdo React a ser exibido dentro do corpo do acordeão.
 * @property {string} [body] - Conteúdo HTML em string a ser exibido dentro do corpo do acordeão. Se `children` for fornecido, `body` será ignorado.
 * @property {'light' | 'dark'} [variant] - A variante de tema do acordeão (claro ou escuro). Se não for fornecido, usará o tema global.
 * @property {string} [className] - Classes CSS adicionais para o componente Accordion.
 * @property {string} [titleColor] - Cor customizada para o título do acordeão.
 * @property {string} [bodyColor] - Cor customizada para o corpo do acordeão.
 * @property {string} [customBackground] - Cor de fundo customizada para o acordeão.
 * @property {string} [customBorderColor] - Cor da borda customizada para o acordeão.
 * @property {string} [customTitleColor] - Cor customizada para o título do acordeão, sobrescrevendo `titleColor`.
 * @property {string} [customContentBackground] - Cor de fundo customizada para o conteúdo do acordeão.
 * @property {boolean} [expanded] - Controla se o acordeão está expandido ou não.
 * @property {(event: React.SyntheticEvent, expanded: boolean) => void} [onChange] - Callback disparado quando o estado de expansão do acordeão muda.
 */

/**
 * Componente CustomAccordion reutilizável que exibe um título e um conteúdo expansível.
 * Ele suporta temas claro/escuro e permite ampla customização de estilo.
 *
 * @param {Props} props - As propriedades do componente.
 * @returns {JSX.Element} O componente Accordion renderizado.
 */
export const CustomAccordion = ({
  title,
  children,
  body,
  variant,
  className,
  titleColor,
  bodyColor,
  customBackground,
  customBorderColor,
  customTitleColor,
  customContentBackground,
  expanded,
  onChange,
}: Props) => {
  // Usar o tema global
  const { isDarkMode } = useTheme()
  const muiTheme = useMuiTheme()

  // Determinar o tema base com base na variante ou no tema global
  const baseTheme = variant
    ? variant === 'light'
      ? lightTheme
      : darkTheme
    : isDarkMode
      ? darkTheme
      : lightTheme

  // Criar o tema customizado com valores garantidos
  const customTheme = {
    background: baseTheme.background,
    borderColor: baseTheme.borderColor,
    titleColor: titleColor || baseTheme.titleColor,
    bodyColor: bodyColor || baseTheme.bodyColor,
    hoverBackground: baseTheme.hoverBackground,
    // Propriedades opcionais
    customBackground,
    customBorderColor,
    customTitleColor,
    customContentBackground,
  }

  const content = body ? <div dangerouslySetInnerHTML={{ __html: body }} /> : children

  return (
    <StyledAccordion customTheme={customTheme} className={className} expanded={expanded} onChange={onChange}>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        customTheme={customTheme}
      >
        {title}
      </StyledAccordionSummary>
      <StyledAccordionDetails customTheme={customTheme}>{content}</StyledAccordionDetails>
    </StyledAccordion>
  )
}
