import { useState } from 'react'

import { AlertDialog } from '../AlertDialog'
import { StyledAddAlertButton } from './styled'

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
      <StyledAddAlertButton onClick={handleAddAlert} variant="contained">
        Adicionar Alerta
      </StyledAddAlertButton>
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
