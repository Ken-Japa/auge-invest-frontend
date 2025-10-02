import { useCallback, useEffect, useState } from 'react'

import { walletApi } from '@/services/api/endpoints/wallet'
import { WalletTransactions } from '@/services/api/types/transaction'

interface UseWalletItemProps {
  walletId: string
  expanded: boolean
}

interface UseWalletItemReturn {
  walletPositions: WalletTransactions | null
  loadingPositions: boolean
  errorPositions: string | null
  fetchWalletPositions: () => Promise<void>
  isAddTransactionOpen: boolean
  setIsAddTransactionOpen: (isOpen: boolean) => void
  isAddSameTransactionOpen: boolean
  setIsAddSameTransactionOpen: (isOpen: boolean) => void
  selectedPosition: string | null
  setSelectedPosition: (positionId: string | null) => void
  expandedRows: string[]
  handleToggleRow: (positionId: string) => void
  isTransactionsDialogOpen: boolean
  setIsTransactionsDialogOpen: (isOpen: boolean) => void
  selectedAssetPositionId: string | null
  setSelectedAssetPositionId: (assetPositionId: string | null) => void
  assetCode: string | null
  setAssetCode: (code: string | null) => void
  assetType: string | null
  setAssetType: (type: string | null) => void
}

/**
 * @function useWalletItem
 * @description Custom hook to manage wallet item logic, including fetching positions and handling transaction dialogs.
 * @param {UseWalletItemProps} props - The props for the hook.
 * @param {string} props.walletId - The ID of the wallet.
 * @param {boolean} props.expanded - Whether the wallet item is expanded.
 * @returns {UseWalletItemReturn} An object containing wallet positions, loading state, error state, and dialog handlers.
 */
export const useWalletItem = ({ walletId, expanded }: UseWalletItemProps): UseWalletItemReturn => {
  const [walletPositions, setWalletPositions] = useState<WalletTransactions | null>(null)
  const [loadingPositions, setLoadingPositions] = useState(true)
  const [errorPositions, setErrorPositions] = useState<string | null>(null)
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isAddSameTransactionOpen, setIsAddSameTransactionOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [isTransactionsDialogOpen, setIsTransactionsDialogOpen] = useState(false)
  const [selectedAssetPositionId, setSelectedAssetPositionId] = useState<string | null>(null)
  const [assetCode, setAssetCode] = useState<string | null>(null)
  const [assetType, setAssetType] = useState<string | null>(null)

  const fetchWalletPositions = useCallback(async () => {
    setLoadingPositions(true)
    setErrorPositions(null)
    try {
      const response = await walletApi.getWalletPosition(walletId)
      setWalletPositions(response)
    } catch (error: any) {
      setErrorPositions(error.message)
    } finally {
      setLoadingPositions(false)
    }
  }, [walletId])

  useEffect(() => {
    if (expanded && walletId) {
      fetchWalletPositions()
    }
  }, [expanded, walletId, fetchWalletPositions])

  const handleToggleRow = useCallback((positionId: string) => {
    setExpandedRows((prev) => {
      const isCurrentlyExpanded = prev.includes(positionId)
      return isCurrentlyExpanded ? prev.filter((id) => id !== positionId) : [...prev, positionId]
    })
  }, [])

  return {
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
    isAddTransactionOpen,
    setIsAddTransactionOpen,
    isAddSameTransactionOpen,
    setIsAddSameTransactionOpen,
    selectedPosition,
    setSelectedPosition,
    expandedRows,
    handleToggleRow,
    isTransactionsDialogOpen,
    setIsTransactionsDialogOpen,
    selectedAssetPositionId,
    setSelectedAssetPositionId,
    assetCode,
    setAssetCode,
    assetType,
    setAssetType,
  }
}
