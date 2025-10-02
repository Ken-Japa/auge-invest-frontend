import { useEffect, useState } from 'react'

import { walletApi } from '@/services/api/endpoints/wallet'
import { Transaction, WalletTransactions } from '@/services/api/types/transaction'

/**
 * @function useAssetPositionsCalculations
 * @description Custom hook to calculate asset data for wallet positions.
 * @param {WalletTransactions | null} walletPositions - The wallet positions data.
 * @param {() => void} onTransactionChange - Callback function to trigger recalculations when transactions change.
 * @returns {Record<string, { averagePrice: number; spentValue: number; quantity: number; netSpentValue: number }>} - Calculated asset data.
 */
export const useAssetPositionsCalculations = (
  walletPositions: WalletTransactions | null,
  onTransactionChange: () => void,
) => {
  const [calculatedAssetData, setCalculatedAssetData] = useState<
    Record<string, { averagePrice: number; spentValue: number; quantity: number; netSpentValue: number }>
  >({})

  useEffect(() => {
    const calculateAssetData = async () => {
      if (!walletPositions || walletPositions.result.length === 0) {
        setCalculatedAssetData({})
        return
      }

      const newCalculatedData: Record<
        string,
        { averagePrice: number; spentValue: number; quantity: number; netSpentValue: number }
      > = {}

      for (const position of walletPositions.result) {
        try {
          const response = await walletApi.getTransactionsByPositionId(position._id)
          const transactions = response.result

          let totalQuantity = 0
          let totalSpent = 0

          transactions.forEach((transaction: Transaction) => {
            if (transaction.type === 'buy') {
              totalQuantity += transaction.quantity
              totalSpent -= transaction.quantity * transaction.price
            } else if (transaction.type === 'sell') {
              totalQuantity -= transaction.quantity
              totalSpent += transaction.quantity * transaction.price
            }
          })

          const averagePrice = totalQuantity !== 0 ? totalSpent / totalQuantity : 0

          newCalculatedData[position._id] = {
            averagePrice: averagePrice,
            spentValue: Math.abs(totalSpent),
            quantity: totalQuantity,
            netSpentValue: totalSpent,
          }
        } catch (error) {
          console.error(`Error calculating asset data for position ${position._id}:`, error)
          newCalculatedData[position._id] = {
            averagePrice: 0,
            spentValue: 0,
            quantity: 0,
            netSpentValue: 0,
          }
        }
      }
      setCalculatedAssetData(newCalculatedData)
    }

    calculateAssetData()
  }, [walletPositions, onTransactionChange])

  return calculatedAssetData
}
