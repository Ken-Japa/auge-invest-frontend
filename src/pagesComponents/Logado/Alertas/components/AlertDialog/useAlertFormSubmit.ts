import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'

import { Alert } from '@/services/api/types'

import { useAlerts } from '../../hooks/useAlerts'

interface AlertFormData {
  asset: string
  type: 'buy' | 'sell'
  targetPrice: number
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
  showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void
}

export const useAlertFormSubmit = ({
  formData,
  alert,
  onClose,
  refreshAlerts,
  showSnackbar,
}: UseAlertFormSubmitProps) => {
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
        percentageDistance: formData.percentageDistance,
        notificationMethods: formData.notificationMethods,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined,
        comments: formData.comments,
        triggered: false,
      }

      if (alert?._id) {
        await updateAlert(alert._id, alertData)
        if (showSnackbar) {
          const alertType = formData.type === 'buy' ? 'compra' : 'venda'
          showSnackbar(
            `Alerta de ${alertType} para ${formData.asset} a R$ ${formData.targetPrice.toFixed(2)} editado com sucesso!`,
            'success',
          )
        }
      } else {
        await createAlert(alertData)
        if (showSnackbar) {
          const alertType = formData.type === 'buy' ? 'compra' : 'venda'
          showSnackbar(
            `Alerta de ${alertType} para ${formData.asset} a R$ ${formData.targetPrice.toFixed(2)} criado com sucesso!`,
            'success',
          )
        }
      }

      onClose()

      if (refreshAlerts) {
        await refreshAlerts()
      }
    } catch (error) {
      console.error('Erro ao salvar alerta:', error)
      if (showSnackbar) {
        showSnackbar('Erro ao salvar alerta.', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, alert, onClose, createAlert, updateAlert, userId, refreshAlerts, showSnackbar])

  return {
    isSubmitting,
    handleSubmit,
  }
}
