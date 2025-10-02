import React from 'react'

import { Wallet } from '@/services/api/types'

import { AddWalletDialog } from './AddWalletDialog'
import { EditWalletDialog } from './EditWalletDialog'

interface WalletDialogsProps {
  openAddDialog: boolean
  onCloseAddDialog: () => void
  onCreateWallet: (name: string, description: string, simulated: boolean) => Promise<void>
  openEditDialog: boolean
  onCloseEditDialog: () => void
  onUpdateWallet: (walletId: string, name: string, description: string, simulated: boolean) => Promise<void>
  editingWallet: Wallet | null
  loading: boolean
  error: string | null
  isSimulated?: boolean
}

export const WalletDialogs: React.FC<WalletDialogsProps> = ({
  openAddDialog,
  onCloseAddDialog,
  onCreateWallet,
  openEditDialog,
  onCloseEditDialog,
  onUpdateWallet,
  editingWallet,
  loading,
  error,
  isSimulated,
}) => {
  return (
    <>
      <AddWalletDialog
        open={openAddDialog}
        onClose={onCloseAddDialog}
        onCreate={onCreateWallet}
        loading={loading}
        error={error}
        isSimulated={isSimulated}
      />

      <EditWalletDialog
        open={openEditDialog}
        onClose={onCloseEditDialog}
        onUpdate={onUpdateWallet}
        loading={loading}
        error={error}
        editingWallet={editingWallet}
      />
    </>
  )
}
