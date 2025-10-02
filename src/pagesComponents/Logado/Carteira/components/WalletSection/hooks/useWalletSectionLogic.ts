import { useCallback, useEffect, useState } from 'react'

import { Wallet } from '@/services/api/types'

import { useDialogState } from './useDialogState'
import { useWalletData } from './useWalletData'

interface UseWalletSectionLogicProps {
  isSimulated?: boolean
}

export const useWalletSectionLogic = ({ isSimulated }: UseWalletSectionLogicProps) => {
  const {
    wallets,
    loading,
    error,
    fetchWallets,
    handleCreateWallet,
    handleUpdateWallet,
    handleConfirmDelete,
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
  } = useWalletData(isSimulated)

  const {
    openAddDialog,
    handleOpenAddDialog,
    handleCloseAddDialog,
    openEditDialog,
    handleOpenEditDialog,
    handleCloseEditDialog,
    openDeleteConfirm,
    handleOpenDeleteConfirm,
    handleCloseDeleteConfirm,
  } = useDialogState()

  const [expanded, setExpanded] = useState<string | false>(false)
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null)
  const [walletToDelete, setWalletToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  const handleCreateWalletAndCloseDialog = useCallback(
    async (name: string, description: string, simulated: boolean) => {
      await handleCreateWallet(name, description, simulated)
      handleCloseAddDialog()
    },
    [handleCreateWallet, handleCloseAddDialog],
  )

  const handleAccordionChange = useCallback(
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    },
    [],
  )

  const collapseAccordion = useCallback(() => {
    setExpanded(false)
  }, [])

  const handleEditWallet = useCallback(
    (wallet: Wallet) => {
      setEditingWallet(wallet)
      handleOpenEditDialog()
    },
    [handleOpenEditDialog],
  )

  const handleUpdateWalletAndCloseDialog = useCallback(
    async (walletId: string, name: string, description: string, simulated: boolean) => {
      await handleUpdateWallet(walletId, name, description, simulated)
      handleCloseEditDialog()
      setEditingWallet(null)
    },
    [handleUpdateWallet, handleCloseEditDialog],
  )

  const handleDeleteWallet = useCallback(
    (walletId: string) => {
      setWalletToDelete(walletId)

      handleOpenDeleteConfirm()
    },
    [handleOpenDeleteConfirm],
  )

  const handleConfirmDeleteAndCloseDialog = useCallback(async () => {
    await handleConfirmDelete(walletToDelete as string)
    handleCloseDeleteConfirm()
    setWalletToDelete(null)
  }, [handleConfirmDelete, walletToDelete, handleCloseDeleteConfirm])

  return {
    wallets,
    loading,
    error,
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
    openAddDialog,
    expanded,
    openEditDialog,
    editingWallet,
    openDeleteConfirm,
    handleOpenAddDialog,
    handleCloseAddDialog,
    handleCreateWalletAndCloseDialog,
    handleAccordionChange,
    handleEditWallet,
    handleUpdateWalletAndCloseDialog,
    handleDeleteWallet,
    handleConfirmDeleteAndCloseDialog,
    handleCloseEditDialog: handleCloseEditDialog,
    handleCloseDeleteConfirm: handleCloseDeleteConfirm,
    collapseAccordion,
  }
}
