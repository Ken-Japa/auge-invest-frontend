import { useCallback, useEffect, useState } from 'react'

import { walletApi } from '@/services/api/endpoints/wallet'
import { Transaction } from '@/services/api/types/transaction'

interface UseTransactionsProps {
  positionId: string
  onTransactionChange: () => void
}

interface UseTransactionsReturn {
  transactions: Transaction[]
  loadingTransactions: boolean
  errorTransactions: string | null
  fetchTransactions: () => void
}

/**
 * @function useTransactions
 * @description Custom hook to fetch and manage transactions for a given position.
 * @param {UseTransactionsProps} props - The props for the hook.
 * @param {string} props.positionId - The ID of the position to fetch transactions for.
 * @param {() => void} props.onTransactionChange - Callback function to be called when transactions change.
 * @returns {UseTransactionsReturn} An object containing transactions, loading state, error state, and a function to refetch transactions.
 */
export const useTransactions = ({
  positionId,
  onTransactionChange,
}: UseTransactionsProps): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(true)
  const [errorTransactions, setErrorTransactions] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    setLoadingTransactions(true)
    setErrorTransactions(null)
    try {
      const response = await walletApi.getTransactionsByPositionId(positionId)
      const orderedTransactions = response.result.sort(
        (a, b) => new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime(),
      )
      setTransactions(orderedTransactions)
    } catch (error: any) {
      setErrorTransactions(error.message)
    } finally {
      setLoadingTransactions(false)
    }
  }, [positionId, setLoadingTransactions, setErrorTransactions, setTransactions])

  useEffect(() => {
    if (positionId) {
      fetchTransactions()
    }
  }, [positionId, onTransactionChange, fetchTransactions])

  return {
    transactions,
    loadingTransactions,
    errorTransactions,
    fetchTransactions,
  }
}
