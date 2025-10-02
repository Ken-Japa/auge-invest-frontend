import { Grid } from '@mui/material'
import React from 'react'

import { Alert } from '@/services/api/types'

import { AlertAssetField } from './components/AlertAssetField/AlertAssetField'
import { AlertCommentsField } from './components/AlertCommentsField/AlertCommentsField'
import { AlertNotificationMethods } from './components/AlertNotificationMethods/AlertNotificationMethods'
import { AlertPriceFields } from './components/AlertPriceFields/AlertPriceFields'
import { AlertTimingFields } from './components/AlertTimingFields/AlertTimingFields'
import { AlertTypeField } from './components/AlertTypeField/AlertTypeField'

interface AlertFormContentProps {
  formData: {
    asset: string
    type: 'buy' | 'sell'
    targetPrice: number
    percentageDistance: number
    notificationMethods: string[]
    expiresAt: string
    recurring: boolean
    comments: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleAssetChange: (newValue: string | null) => void
  handleNotificationMethodsChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  alert: Alert | null
}

/**
 * Componente para renderizar o conteúdo do formulário de alerta.
 * @param {AlertFormContentProps} props - As props do componente.
 */
export const AlertFormContent: React.FC<AlertFormContentProps> = ({
  formData,
  handleChange,
  handleAssetChange,
  handleNotificationMethodsChange,
  alert,
}) => {
  return (
    <Grid container spacing={2}>
      <AlertAssetField formData={formData} handleAssetChange={handleAssetChange} alert={alert} />
      <AlertTypeField type={formData.type} handleChange={handleChange} />
      <AlertPriceFields formData={formData} handleChange={handleChange} />
      <AlertNotificationMethods
        notificationMethods={formData.notificationMethods}
        handleNotificationMethodsChange={handleNotificationMethodsChange}
      />
      <AlertTimingFields formData={formData} handleChange={handleChange} />
      <AlertCommentsField comments={formData.comments} handleChange={handleChange} />
    </Grid>
  )
}
