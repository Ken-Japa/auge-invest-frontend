import NotificationsIcon from '@mui/icons-material/Notifications'
import { FormControlLabel, Switch } from '@mui/material'

import { SettingsCard } from '@/components/Core/Card/SettingsCard'

import { SettingsControlContainer } from '../../styled'

interface NotificationTypes {
  email: boolean
  push: boolean
  priceAlerts: boolean
}

interface NotificationSettingsProps {
  notifications: NotificationTypes
  onNotificationChange: (type: keyof NotificationTypes) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const NotificationSettings = ({ notifications, onNotificationChange }: NotificationSettingsProps) => {
  return (
    <SettingsCard icon={<NotificationsIcon />} title="Notificações">
      <SettingsControlContainer>
        <FormControlLabel
          control={<Switch checked={notifications.email} onChange={onNotificationChange('email')} />}
          label="Receber alertas por e-mail"
        />
        <FormControlLabel
          control={<Switch checked={notifications.push} onChange={onNotificationChange('push')} />}
          label="Notificações push"
        />
        <FormControlLabel
          control={
            <Switch checked={notifications.priceAlerts} onChange={onNotificationChange('priceAlerts')} />
          }
          label="Alertas de preço"
        />
      </SettingsControlContainer>
    </SettingsCard>
  )
}
