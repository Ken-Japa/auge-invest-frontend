import { useMutation } from '@tanstack/react-query'

import { TransactionForm } from '@/pagesComponents/Logado/Carteira/components/WalletSection/components/Dialogs/TransactionForm'
import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext'
import { api } from '@/services/api'
import { CreateTransactionPayload } from '@/services/api/types/transaction'

import { StyledDialog, StyledDialogContent, StyledDialogTitle } from './styled'

interface AddTransactionDialogProps {
  open: boolean
  onClose: () => void
  positionId: string | null
  userId: string
  onSave: () => void
}

export const AddTransactionDialog = ({
  open,
  onClose,
  positionId,
  onSave,
  userId,
}: AddTransactionDialogProps) => {
  const { triggerRefresh } = useRecentActivitiesRefresh()

  const createTransactionMutation = useMutation({
    mutationFn: (payload: CreateTransactionPayload) => api.wallet.createTransaction(payload),
    onSuccess: () => {
      onClose()
      onSave()
      triggerRefresh()
    },
    onError: (error) => {
      console.error('Erro criando a transação:', error)
    },
  })

  const handleSubmit = (data: any) => {
    if (!positionId) {
      return
    }

    const payload: CreateTransactionPayload = {
      userId: userId,
      portfolioId: positionId,
      type: data.type as 'buy' | 'sell',
      assetType: data.assetType as
        | 'stocks'
        | 'derivatives'
        | 'etfs'
        | 'bdrs'
        | 'fiis'
        | 'treasury'
        | 'ficticio',
      assetCode: data.assetCode,
      quantity: parseInt(data.quantity),
      price: parseFloat(data.price),
      executedAt: data.date ? data.date.toISOString() : new Date().toISOString(),
    }

    createTransactionMutation.mutate(payload)
  }

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>Adicionar Transação</StyledDialogTitle>
      <StyledDialogContent>
        <TransactionForm onSubmit={handleSubmit} onCancel={onClose} />
      </StyledDialogContent>
    </StyledDialog>
  )
}
