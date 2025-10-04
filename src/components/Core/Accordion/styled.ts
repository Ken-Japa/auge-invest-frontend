import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'

import { customColors } from '@/theme/palette'
import { borderRadius, spacing, transitions } from '@/theme/variables'

// Definição dos temas para o Accordion
export const lightTheme = {
  background: customColors.cardBackground.light,
  borderColor: customColors.cardBorder.light,
  titleColor: customColors.accordionTitle.light,
  bodyColor: customColors.accordionBody.light,
  hoverBackground: customColors.hoverEffect.light,
}

export const darkTheme = {
  background: customColors.cardBackground.dark,
  borderColor: customColors.cardBorder.dark,
  titleColor: customColors.accordionTitle.dark,
  bodyColor: customColors.accordionBody.dark,
  hoverBackground: customColors.hoverEffect.dark,
}

// Tipo para o tema customizado
interface CustomTheme {
  background: string
  borderColor: string
  titleColor: string
  bodyColor: string
  hoverBackground: string
  customBackground?: string
  customBorderColor?: string
  customTitleColor?: string
  customContentBackground?: string
}

// Componentes estilizados
export const StyledAccordion = styled(MuiAccordion, {
  shouldForwardProp: (prop) => prop !== 'customTheme',
})<{ customTheme: CustomTheme }>(({ customTheme }) => ({
  backgroundColor: customTheme.customBackground || customTheme.background,
  border: `1px solid ${customTheme.customBorderColor || customTheme.borderColor}`,
  borderRadius: borderRadius.md,
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
    marginBottom: spacing.lg, // Using theme spacing variable
  },
  marginBottom: spacing.md, // Using theme spacing variable
  overflow: 'hidden',
  transition: transitions.medium, // Using theme transition variable
}))

export const StyledAccordionSummary = styled(MuiAccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'customTheme',
})<{ customTheme: CustomTheme }>(({ customTheme }) => ({
  backgroundColor: customTheme.customBackground || customTheme.background,
  color: customTheme.customTitleColor || customTheme.titleColor,
  fontWeight: 500,
  padding: `${spacing.sm} ${spacing.md}`,
  '&:hover': {
    backgroundColor: customTheme.hoverBackground,
  },
  '& .MuiAccordionSummary-content': {
    margin: `${spacing.sm} 0`,
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: customTheme.customTitleColor || customTheme.titleColor,
  },
}))

export const StyledAccordionDetails = styled(MuiAccordionDetails, {
  shouldForwardProp: (prop) => prop !== 'customTheme',
})<{ customTheme: CustomTheme }>(({ customTheme }) => ({
  padding: spacing.md,
  color: customTheme.bodyColor,
  backgroundColor: customTheme.customContentBackground || customTheme.background,
  borderTop: `1px solid ${customTheme.customBorderColor || customTheme.borderColor}`,
}))
