import { FormControlLabel, Switch } from '@mui/material'

import { SettingsCard } from '@/components/Core/Card/SettingsCard'
import { DarkIcon, LightIcon } from '@/theme/components/TrocarTema/styled'
import { useTheme } from '@/theme/ThemeContext'

import { SettingsControlContainer } from '../../styled'

export const AppearanceSettings = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <SettingsCard icon={isDarkMode ? <DarkIcon /> : <LightIcon />} title="Aparência">
      <SettingsControlContainer>
        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={toggleTheme} color="primary" />}
          label={isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
        />
      </SettingsControlContainer>
    </SettingsCard>
  )
}
