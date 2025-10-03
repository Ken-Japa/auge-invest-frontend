'use client'

import { FormControlLabel, Switch } from '@mui/material'

import { useTheme } from '@/theme/ThemeContext'

import { DarkIcon, LightIcon, ThemeContainer, ThemeControlContainer, ThemeInfo, ThemeLabel } from './styled'

/**
 * @component ThemePreference
 * @description Componente que permite ao usuário alternar entre o modo claro e escuro.
 * Utiliza o `useTheme` hook para acessar e modificar o estado do tema.
 * Exibe um `Switch` do Material-UI e ícones para representar o tema atual.
 */
export const ThemePreference = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <ThemeContainer>
      <ThemeInfo>
        <ThemeLabel>Preferência de Tema</ThemeLabel>
        <ThemeControlContainer>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleTheme} color="primary" />}
            label={isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
          />
          {isDarkMode ? <DarkIcon /> : <LightIcon />}
        </ThemeControlContainer>
      </ThemeInfo>
    </ThemeContainer>
  )
}
