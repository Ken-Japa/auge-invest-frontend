import { FormControlLabel, Switch, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext'
import { Wallet } from '@/services/api/types'

import {
  CancelButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
  UpdateButton,
} from './styled'

interface EditWalletDialogProps {
  open: boolean
  onClose: () => void
  onUpdate: (walletId: string, name: string, description: string, simulated: boolean) => void
  loading: boolean
  error: string | null
  editingWallet: Wallet | null
}

export const EditWalletDialog: React.FC<EditWalletDialogProps> = ({
  open,
  onClose,
  onUpdate,
  loading,
  editingWallet,
}) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [simulatedState, setSimulatedState] = useState<boolean>(false)
  const { triggerRefresh } = useRecentActivitiesRefresh()

  useEffect(() => {
    if (editingWallet) {
      setName(editingWallet.name)
      setDescription(editingWallet.description || '')
      setSimulatedState(editingWallet.simulated)
    }
  }, [editingWallet])

  const handleUpdate = () => {
    if (editingWallet) {
      onUpdate(editingWallet._id, name, description, simulatedState)
      triggerRefresh()
    }
  }

  const handleCloseDialog = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    onClose()
  }

  const handleSimulatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSimulatedState(event.target.checked)
  }

  return (
    <StyledDialog open={open} onClose={handleCloseDialog}>
      <StyledDialogTitle>Editar Carteira</StyledDialogTitle>
      <StyledDialogContent>
        <TextField
          inputRef={nameInputRef}
          margin="dense"
          label="Nome da Carteira"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descrição"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={simulatedState}
              onChange={handleSimulatedChange}
              name="simulated"
              color="primary"
            />
          }
          label={simulatedState ? 'Carteira Simulada' : 'Carteira Real'}
          sx={{ alignSelf: 'flex-end', mt: 2 }}
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={handleCloseDialog}>Cancelar</CancelButton>
        <UpdateButton onClick={handleUpdate} disabled={loading || !name}>
          {loading ? 'Atualizando...' : 'Atualizar'}
        </UpdateButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}
