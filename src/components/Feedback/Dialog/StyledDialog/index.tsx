import { ReactNode } from 'react'

import {
  CancelButton,
  SaveButton,
  StyledDialog as Dialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from './styled'

interface StyledDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  onCancel?: () => void
  onSave?: () => void
  cancelText?: string
  saveText?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  disableSave?: boolean
  loading?: boolean
}

export const StyledDialog = ({
  open,
  onClose,
  title,
  children,
  onCancel,
  onSave,
  cancelText = 'Cancelar',
  saveText = 'Salvar',
  maxWidth = 'sm',
  fullWidth = true,
  disableSave = false,
  loading = false,
}: StyledDialogProps) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>{children}</StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={handleCancel}>{cancelText}</CancelButton>
        {onSave && (
          <SaveButton onClick={onSave} disabled={disableSave || loading}>
            {saveText}
          </SaveButton>
        )}
      </StyledDialogActions>
    </Dialog>
  )
}
