import 'dayjs/locale/pt-br'

import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { TransactionForm } from '@/pagesComponents/Logado/Carteira/components/WalletSection/components/Dialogs/TransactionForm'
import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext'
import { api } from '@/services/api'
import { CreateTransactionPayload } from '@/services/api/types/transaction'

import { StyledDialog, StyledDialogContent, StyledDialogTitle } from './styled'

interface AddSameTransactionDialogProps {
  open: boolean
  onClose: () => void
  positionId: string | null
  userId: string
  onSave: () => void
  assetCode: string | null
  assetType: string | null
}

export const AddSameTransactionDialog = ({
  open,
  onClose,
  positionId,
  onSave,
  userId,
  assetCode,
  assetType,
}: AddSameTransactionDialogProps) => {
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
    if (!positionId || !assetType || !assetCode) {
      console.error('Dados essenciais faltando para a transação.')
      return
    }

    const payload: CreateTransactionPayload = {
      userId: userId,
      portfolioId: positionId,
      type: data.type as 'buy' | 'sell',
      assetType: assetType as 'stocks' | 'derivatives' | 'etfs' | 'bdrs' | 'fiis' | 'treasury',
      assetCode: assetCode,
      quantity: parseFloat(data.quantity),
      price: parseFloat(data.price),
      executedAt: dayjs(data.date).toISOString(),
    }

    createTransactionMutation.mutate(payload)
  }

  const initialValues = {
    type: 'buy',
    assetType: assetType,
    assetCode: assetCode,
    quantity: '',
    price: '',
    date: dayjs(),
  }

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>Adicionar Transação de {assetCode} </StyledDialogTitle>
      <StyledDialogContent>
        <TransactionForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={onClose}
          disableAssetFields={true}
        />
      </StyledDialogContent>
    </StyledDialog>
  )
}
