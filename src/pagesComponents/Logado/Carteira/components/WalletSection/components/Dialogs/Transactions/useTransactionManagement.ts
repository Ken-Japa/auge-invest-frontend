import { useCallback, useEffect, useState } from 'react'

import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext'
import { walletApi } from '@/services/api/endpoints/wallet'
import { Transaction } from '@/services/api/types/transaction'

interface UseTransactionManagementProps {
  assetId: string | null
  onSave: () => void
}

export const useTransactionManagement = ({ assetId, onSave }: UseTransactionManagementProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false)
  const [selectedTransactionForEdit, setSelectedTransactionForEdit] = useState<Transaction | null>(null)
  const [isDeleteTransactionOpen, setIsDeleteTransactionOpen] = useState(false)
  const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null)

  const { triggerRefresh } = useRecentActivitiesRefresh()

  const fetchTransactions = useCallback(async () => {
    if (!assetId) return
    setLoading(true)
    setError(null)
    try {
      const response = await walletApi.getTransactionsByPositionId(assetId)
      const orderedTransactions = response.result.sort(
        (a, b) => new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime(),
      )
      setTransactions(orderedTransactions)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }, [assetId])

  useEffect(() => {
    if (assetId) {
      fetchTransactions()
    }
  }, [assetId, fetchTransactions])

  const handleTransactionSavedOrDeleted = useCallback(() => {
    fetchTransactions()
    onSave()
    triggerRefresh()
  }, [fetchTransactions, onSave, triggerRefresh])

  const handleOpenAddTransaction = useCallback(() => {
    setIsAddTransactionOpen(true)
  }, [])

  const handleCloseAddTransaction = useCallback(() => {
    setIsAddTransactionOpen(false)
  }, [])

  const handleOpenEditTransaction = useCallback((transaction: Transaction) => {
    setSelectedTransactionForEdit(transaction)
    setIsEditTransactionOpen(true)
  }, [])

  const handleCloseEditTransaction = useCallback(() => {
    setIsEditTransactionOpen(false)
    setSelectedTransactionForEdit(null)
  }, [])

  const handleOpenDeleteTransaction = useCallback((transactionId: string) => {
    setTransactionToDeleteId(transactionId)
    setIsDeleteTransactionOpen(true)
  }, [])

  const handleCloseDeleteTransaction = useCallback(() => {
    setIsDeleteTransactionOpen(false)
    setTransactionToDeleteId(null)
  }, [])

  return {
    transactions,
    loading,
    error,
    isAddTransactionOpen,
    isEditTransactionOpen,
    selectedTransactionForEdit,
    isDeleteTransactionOpen,
    transactionToDeleteId,
    handleTransactionSavedOrDeleted,
    handleOpenAddTransaction,
    handleCloseAddTransaction,
    handleOpenEditTransaction,
    handleCloseEditTransaction,
    handleOpenDeleteTransaction,
    handleCloseDeleteTransaction,
  }
}
