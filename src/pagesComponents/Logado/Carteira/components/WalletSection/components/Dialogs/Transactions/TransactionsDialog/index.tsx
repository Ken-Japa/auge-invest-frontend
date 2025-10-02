import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'

import { AddSameTransactionDialog } from '../AddTransactionSameAsset'
import { DeleteTransactionConfirmDialog } from '../DeleteTransactionConfirmDialog'
import { EditTransactionDialog } from '../EditTransactionDialog'
import { TransactionList } from '../TransactionList'
import { useTransactionManagement } from '../useTransactionManagement'

import {
  CloseButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from './styled'

interface TransactionsDialogProps {
  open: boolean
  onClose: () => void
  assetId: string | null
  onSave: () => void
  userId: string
  assetCode: string | null
  assetType: string | null
}

export const TransactionsDialog: React.FC<TransactionsDialogProps> = ({
  open,
  onClose,
  assetId,
  onSave,
  userId,
  assetCode,
  assetType,
}) => {
  const {
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
  } = useTransactionManagement({ assetId, onSave })

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>Transações do Ativo {assetCode}</StyledDialogTitle>
      <StyledDialogContent>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpenAddTransaction}
            sx={{
              backgroundColor: '#0A1929',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1A3A5B',
              },
              '.MuiButton-startIcon': {
                color: 'white',
              },
            }}
          >
            Adicionar Transação
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Erro ao carregar transações: {error}</Typography>
        ) : transactions.length > 0 ? (
          <TransactionList
            transactions={transactions}
            onEdit={handleOpenEditTransaction}
            onDelete={handleOpenDeleteTransaction}
          />
        ) : (
          <Typography>Nenhuma transação encontrada para este ativo.</Typography>
        )}

        <AddSameTransactionDialog
          open={isAddTransactionOpen}
          onClose={handleCloseAddTransaction}
          userId={userId}
          positionId={assetId}
          assetCode={assetCode}
          assetType={assetType}
          onSave={handleTransactionSavedOrDeleted}
        />

        <EditTransactionDialog
          open={isEditTransactionOpen}
          onClose={handleCloseEditTransaction}
          transaction={selectedTransactionForEdit}
          onSave={handleTransactionSavedOrDeleted}
          assetCode={assetCode}
          assetType={assetType}
        />

        <DeleteTransactionConfirmDialog
          open={isDeleteTransactionOpen}
          onClose={handleCloseDeleteTransaction}
          positionId={assetId}
          transactionId={transactionToDeleteId}
          onConfirm={handleTransactionSavedOrDeleted}
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}
