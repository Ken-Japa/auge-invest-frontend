import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { transitions } from '@/theme/variables'

/**
 * @const ThemeContainer
 * @description Componente estilizado para o contêiner principal da preferência de tema.
 * Define a largura total e a margem inferior.
 */
export const ThemeContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}))

/**
 * @const ThemeInfo
 * @description Componente estilizado para o contêiner de informações do tema.
 * Aplica preenchimento vertical.
 */
export const ThemeInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}))

/**
 * @const ThemeLabel
 * @description Componente estilizado para o rótulo da preferência de tema.
 * Define peso da fonte, cor do texto, margem inferior e variante de tipografia.
 */
export const ThemeLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  variant: 'body2',
}))

/**
 * @const ThemeControlContainer
 * @description Componente estilizado para o contêiner dos controles de tema.
 * Organiza os elementos de controle em um layout flexível com alinhamento e margem superior.
 */
export const ThemeControlContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: theme.spacing(1),
}))

/**
 * @const DarkIcon
 * @description Ícone estilizado para representar o modo escuro.
 * Define a cor do ícone, transição e margem esquerda.
 */
export const DarkIcon = styled(DarkModeIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: transitions.medium,
  marginLeft: theme.spacing(1),
}))

/**
 * @const LightIcon
 * @description Ícone estilizado para representar o modo claro.
 * Define a cor do ícone, transição e margem esquerda.
 */
export const LightIcon = styled(LightModeIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
  transition: transitions.medium,
  marginLeft: theme.spacing(1),
}))
