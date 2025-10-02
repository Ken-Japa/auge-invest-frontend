'use client'

import { FormControlLabel, Switch } from '@mui/material'

import { useTheme } from '@/theme/ThemeContext'

import { DarkIcon, LightIcon, ThemeContainer, ThemeControlContainer, ThemeInfo, ThemeLabel } from './styled'

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
