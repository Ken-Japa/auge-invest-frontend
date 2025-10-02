import 'dayjs/locale/pt-br'

import { Box, CircularProgress, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { TransactionForm } from '@/pagesComponents/Logado/Carteira/components/WalletSection/components/Dialogs/TransactionForm'
import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext'
import { api } from '@/services/api'
import { Transaction } from '@/services/api/types/transaction'

import { StyledDialog, StyledDialogContent, StyledDialogTitle } from './styled'

interface EditTransactionDialogProps {
  open: boolean
  onClose: () => void
  transaction: Transaction | null
  onSave: () => void
  assetCode: string | null
  assetType: string | null
}

export const EditTransactionDialog: React.FC<EditTransactionDialogProps> = ({
  open,
  onClose,
  transaction,
  onSave,
  assetCode,
  assetType,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { triggerRefresh } = useRecentActivitiesRefresh()

  const handleSave = async (data: any) => {
    if (!transaction) return

    setLoading(true)
    setError(null)
    try {
      await api.wallet.updateTransaction(transaction._id, {
        quantity: parseFloat(data.quantity),
        price: parseFloat(data.price),
        type: data.type,
        executedAt: dayjs(data.date).toISOString(),
      })
      onSave()
      onClose()
      triggerRefresh()
    } catch (err: any) {
      setError(err.message || 'Failed to update transaction.')
    } finally {
      setLoading(false)
    }
  }

  const initialValues = transaction
    ? {
        type: transaction.type,
        assetType: assetType,
        assetCode: assetCode,
        quantity: transaction.quantity,
        price: transaction.price,
        date: dayjs(transaction.executedAt),
      }
    : undefined

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>Editar Operação</StyledDialogTitle>
      <StyledDialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Erro ao carregar transação: {error}</Typography>
        ) : (
          <TransactionForm
            initialValues={initialValues}
            onSubmit={handleSave}
            onCancel={onClose}
            isEdit={true}
            disableAssetFields={true}
          />
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </StyledDialogContent>
    </StyledDialog>
  )
}
