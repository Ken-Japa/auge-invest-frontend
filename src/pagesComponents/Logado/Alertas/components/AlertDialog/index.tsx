import { DialogContent } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'

import { StyledDialog } from '@/components/Feedback/Dialog/StyledDialog'
import { Alert } from '@/services/api/types'

import { AlertFormContent } from './AlertFormContent'
import { useAlertFormSubmit } from './useAlertFormSubmit'

interface AlertDialogProps {
  open: boolean
  onClose: () => void
  alert: Alert | null
  refreshAlerts?: () => Promise<void>
}

export const AlertDialog = ({ open, onClose, alert, refreshAlerts }: AlertDialogProps) => {
  const { data: session } = useSession()

  const [formData, setFormData] = useState({
    asset: '',
    type: 'buy' as 'buy' | 'sell',
    targetPrice: 0,
    currentPrice: 0,
    percentageDistance: 0,
    notificationMethods: [] as string[],
    expiresAt: '',
    recurring: false,
    comments: '',
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      const type = (e.target as HTMLInputElement).type
      const checked = (e.target as HTMLInputElement).checked

      setFormData((prevData) => ({
        ...prevData,
        [name]:
          type === 'checkbox'
            ? checked
            : name.includes('Price') || name.includes('Distance')
              ? parseFloat(value) || 0
              : value,
      }))
    },
    [],
  )

  const handleAssetChange = useCallback((newValue: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      asset: newValue || '',
    }))
  }, [])

  const handleNotificationMethodsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      notificationMethods: checked
        ? [...prev.notificationMethods, value]
        : prev.notificationMethods.filter((method) => method !== value),
    }))
  }, [])

  useEffect(() => {
    if (alert) {
      setFormData({
        asset: alert.asset,
        type: alert.type,
        targetPrice: alert.targetPrice,
        currentPrice: alert.currentPrice || 0,
        percentageDistance: alert.percentageDistance || 0,
        notificationMethods: alert.notificationMethods || [],
        expiresAt: alert.expiresAt ? new Date(alert.expiresAt).toISOString().split('T')[0] : '',
        recurring: alert.recurring || false,
        comments: alert.comments || ' ',
      })
    } else {
      setFormData({
        asset: '',
        type: 'buy',
        targetPrice: 0,
        currentPrice: 0,
        percentageDistance: 0,
        notificationMethods: ['app_notification'],
        expiresAt: '',
        recurring: false,
        comments: ' ',
      })
    }
  }, [alert, open])

  const { isSubmitting, handleSubmit } = useAlertFormSubmit({
    formData,
    alert,
    onClose,
    refreshAlerts,
  })

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      title={alert ? 'Editar Alerta' : 'Novo Alerta'}
      onSave={handleSubmit}
      disableSave={
        isSubmitting || !formData.asset || !formData.targetPrice || formData.notificationMethods.length === 0
      }
      loading={isSubmitting}
    >
      <DialogContent>
        <AlertFormContent
          formData={formData}
          handleChange={handleChange}
          handleAssetChange={handleAssetChange}
          handleNotificationMethodsChange={handleNotificationMethodsChange}
          alert={alert}
        />
      </DialogContent>
    </StyledDialog>
  )
}
