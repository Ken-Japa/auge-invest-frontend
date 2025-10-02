import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'

import { Alert } from '@/services/api/types'

import { useAlerts } from '../../hooks/useAlerts'

interface AlertFormData {
  asset: string
  type: 'buy' | 'sell'
  targetPrice: number
  currentPrice: number
  percentageDistance: number
  notificationMethods: string[]
  expiresAt: string
  recurring: boolean
  comments: string
}

interface UseAlertFormSubmitProps {
  formData: AlertFormData
  alert: Alert | null
  onClose: () => void
  refreshAlerts?: () => Promise<void>
}

export const useAlertFormSubmit = ({ formData, alert, onClose, refreshAlerts }: UseAlertFormSubmitProps) => {
  const { createAlert, updateAlert } = useAlerts()
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true)

      if (!userId) {
        console.error('User not authenticated.')
        return
      }

      const alertData = {
        asset: formData.asset,
        type: formData.type,
        targetPrice: formData.targetPrice,
        currentPrice: formData.currentPrice,
        percentageDistance: formData.percentageDistance,
        notificationMethods: formData.notificationMethods,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined,
        comments: formData.comments,
        triggered: false,
      }

      if (alert) {
        await updateAlert(alert._id, alertData)
      } else {
        await createAlert(alertData)
      }

      onClose()
      if (refreshAlerts) {
        await refreshAlerts()
      }
    } catch (error) {
      console.error('Erro ao salvar alerta:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, alert, onClose, createAlert, updateAlert, userId, refreshAlerts])

  return {
    isSubmitting,
    handleSubmit,
  }
}
