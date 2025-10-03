import React from 'react'

import {
  StyledButtonCancel,
  StyledButtonConfirm,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogTitle,
} from './styled'

interface ConfirmDeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  alertDetails: string
}

export const ConfirmDeleteDialog = ({ open, onClose, onConfirm, alertDetails }: ConfirmDeleteDialogProps) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <StyledDialogTitle id="alert-dialog-title">{'Confirmar Exclusão'}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledDialogContentText id="alert-dialog-description">
          Tem certeza que deseja excluir o alerta {alertDetails}?
          <br />
          Esta ação não pode ser desfeita.
        </StyledDialogContentText>
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButtonCancel onClick={onClose} color="primary">
          Cancelar
        </StyledButtonCancel>
        <StyledButtonConfirm onClick={onConfirm} color="error" autoFocus variant="contained">
          Excluir
        </StyledButtonConfirm>
      </StyledDialogActions>
    </StyledDialog>
  )
}
