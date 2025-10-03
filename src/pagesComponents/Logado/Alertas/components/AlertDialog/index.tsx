import { Button, DialogActions, CircularProgress } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

import { Alert } from '@/services/api/types'

import { AlertFormContent } from './AlertFormContent'
import { ConfirmDeleteDialog } from './components/ConfirmDeleteDialog/ConfirmDeleteDialog'
import { StyledDialog, StyledDialogContent, StyledDialogTitle } from './styled'
import { useAlertFormSubmit } from './useAlertFormSubmit'

interface AlertDialogProps {
  open: boolean
  onClose: () => void
  alert: Alert | null
  refreshAlerts?: () => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void
  onDelete?: () => void
}

export const AlertDialog = ({
  open,
  onClose,
  alert,
  refreshAlerts,
  showSnackbar,
  onDelete,
}: AlertDialogProps) => {
  const { data: session } = useSession()

  const [formData, setFormData] = useState({
    asset: '',
    type: 'buy' as 'buy' | 'sell',
    targetPrice: 0,
    percentageDistance: 0,
    notificationMethods: [] as string[],
    expiresAt: '',
    recurring: true,
    comments: '',
  })

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

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
        percentageDistance: 0,
        notificationMethods: ['app_notification'],
        expiresAt: '',
        recurring: true,
        comments: '',
      })
    }
  }, [alert, open])

  const { isSubmitting, handleSubmit } = useAlertFormSubmit({
    formData,
    alert,
    onClose,
    refreshAlerts,
    showSnackbar,
  })

  return (
    <StyledDialog
      open={open}
      onClose={() => {
        if (!isSubmitting) {
          if (showSnackbar) {
            showSnackbar(alert ? 'Edição de alerta cancelada.' : 'Criação de alerta cancelada.', 'info')
          }
        }
        onClose()
      }}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle>{alert ? 'Editar Alerta' : 'Novo Alerta'}</StyledDialogTitle>
      <StyledDialogContent>
        <AlertFormContent
          formData={formData}
          handleChange={handleChange}
          handleAssetChange={handleAssetChange}
          handleNotificationMethodsChange={handleNotificationMethodsChange}
          alert={alert}
        />
      </StyledDialogContent>
      <DialogActions sx={{ padding: '16px 24px', justifyContent: 'space-between' }}>
        {alert && onDelete && (
          <Button
            onClick={() => setOpenConfirmDelete(true)}
            color="error"
            variant="contained"
            sx={{ color: 'white' }}
          >
            Excluir Alerta
          </Button>
        )}
        <div>
          <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={
              isSubmitting ||
              !formData.asset ||
              !formData.targetPrice ||
              formData.notificationMethods.length === 0
            }
            sx={{ ml: 2 }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
          </Button>
        </div>
      </DialogActions>

      <ConfirmDeleteDialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={() => {
          setOpenConfirmDelete(false)
          onDelete && onDelete()
        }}
        alertDetails={
          alert
            ? `${alert.type === 'buy' ? 'compra' : 'venda'} de ${alert.asset} a R$ ${alert.targetPrice.toFixed(2)}`
            : 'este alerta'
        }
      />
    </StyledDialog>
  )
}
