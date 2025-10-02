import { useState } from 'react'

import { CustomButton } from '@/components/Core/Button'

import { AlertDialog } from '../AlertDialog'

interface AddAlertButtonProps {
  refreshAlerts: () => Promise<void>
  showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void
}

export const AddAlertButton = ({ refreshAlerts, showSnackbar }: AddAlertButtonProps) => {
  const [open, setOpen] = useState(false)

  const handleAddAlert = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <CustomButton onClick={handleAddAlert} variant="contained">
        Adicionar Alerta
      </CustomButton>
      <AlertDialog
        open={open}
        onClose={handleCloseDialog}
        alert={null}
        refreshAlerts={refreshAlerts}
        showSnackbar={showSnackbar}
      />
    </>
  )
}
