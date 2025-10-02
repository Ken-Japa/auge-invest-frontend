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
