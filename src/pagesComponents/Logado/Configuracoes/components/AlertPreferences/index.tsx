import PercentIcon from '@mui/icons-material/Percent'
import { Slider } from '@mui/material'

import { SettingsCard } from '@/components/Core/Card/SettingsCard'

import { SliderContainer, SliderDescription, SliderLabel } from '../../styled'

interface AlertPreferencesProps {
  percentages: {
    buy: number
    sell: number
  }
  onPercentageChange: (type: 'buy' | 'sell') => (event: Event, newValue: number | number[]) => void
}

export const AlertPreferences = ({ percentages, onPercentageChange }: AlertPreferencesProps) => {
  return (
    <SettingsCard icon={<PercentIcon />} title="Preferências de Alerta">
      <SliderContainer>
        <SliderLabel gutterBottom>Alerta de Compra: {percentages.buy}%</SliderLabel>
        <Slider
          value={percentages.buy}
          onChange={onPercentageChange('buy')}
          min={1}
          max={20}
          step={1}
          marks={[
            { value: 1, label: '1%' },
            { value: 5, label: '5%' },
            { value: 10, label: '10%' },
            { value: 20, label: '20%' },
          ]}
          sx={{ color: (theme) => theme.palette.success.main }}
        />
        <SliderDescription variant="body2">
          Alerta quando o preço estiver a % do valor de alerta de compra
        </SliderDescription>
      </SliderContainer>

      <SliderContainer>
        <SliderLabel gutterBottom>Alerta de Venda: {percentages.sell}%</SliderLabel>
        <Slider
          value={percentages.sell}
          onChange={onPercentageChange('sell')}
          min={1}
          max={20}
          step={1}
          marks={[
            { value: 1, label: '1%' },
            { value: 5, label: '5%' },
            { value: 10, label: '10%' },
            { value: 20, label: '20%' },
          ]}
          sx={{ color: (theme) => theme.palette.error.main }}
        />
        <SliderDescription variant="body2">
          Alerta quando o preço estiver a % do valor de alerta de venda
        </SliderDescription>
      </SliderContainer>
    </SettingsCard>
  )
}
