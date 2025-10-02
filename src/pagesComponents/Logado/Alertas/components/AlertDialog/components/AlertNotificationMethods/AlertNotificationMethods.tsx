import { Checkbox, FormControlLabel, Grid } from '@mui/material'
import React from 'react'

import { StyledFormGroup, StyledFormLabel } from './styled'

interface AlertNotificationMethodsProps {
  notificationMethods: string[]
  handleNotificationMethodsChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Componente para seleção dos métodos de notificação do alerta.
 * @param {AlertNotificationMethodsProps} props - As props do componente.
 */
export const AlertNotificationMethods: React.FC<AlertNotificationMethodsProps> = ({
  notificationMethods,
  handleNotificationMethodsChange,
}) => {
  return (
    <Grid item xs={12}>
      <StyledFormLabel component="legend">Métodos de Notificação*</StyledFormLabel>
      <StyledFormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={notificationMethods.includes('email')}
              onChange={handleNotificationMethodsChange}
              value="email"
            />
          }
          label="Email"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={notificationMethods.includes('app_notification')}
              onChange={handleNotificationMethodsChange}
              value="app_notification"
            />
          }
          label="Notificação no App"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={notificationMethods.includes('sms')}
              onChange={handleNotificationMethodsChange}
              value="sms"
            />
          }
          label="SMS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={notificationMethods.includes('whatsapp')}
              onChange={handleNotificationMethodsChange}
              value="whatsapp"
            />
          }
          label="WhatsApp"
        />
      </StyledFormGroup>
    </Grid>
  )
}
