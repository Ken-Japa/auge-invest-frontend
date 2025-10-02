import { useCallback, useState } from 'react'

/**
 * @function useDialogState
 * @description Custom hook to manage the open/close state of multiple dialogs.
 * @returns An object containing the state and handlers for add, edit, and delete dialogs.
 */
export const useDialogState = () => {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false)

  const handleOpenAddDialog = useCallback(() => {
    setOpenAddDialog(true)
  }, [])

  const handleCloseAddDialog = useCallback(() => {
    setOpenAddDialog(false)
  }, [])

  const handleOpenEditDialog = useCallback(() => {
    setOpenEditDialog(true)
  }, [])

  const handleCloseEditDialog = useCallback(() => {
    setOpenEditDialog(false)
  }, [])

  const handleOpenDeleteConfirm = useCallback(() => {
    setOpenDeleteConfirm(true)
  }, [])

  const handleCloseDeleteConfirm = useCallback(() => {
    setOpenDeleteConfirm(false)
  }, [])

  return {
    openAddDialog,
    handleOpenAddDialog,
    handleCloseAddDialog,
    openEditDialog,
    handleOpenEditDialog,
    handleCloseEditDialog,
    openDeleteConfirm,
    handleOpenDeleteConfirm,
    handleCloseDeleteConfirm,
  }
}
