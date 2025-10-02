import { Box, CircularProgress, TableBody, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'

import { Transaction } from '@/services/api/types/transaction'

import { DeleteTransactionConfirmDialog } from '../../Dialogs/Transactions/DeleteTransactionConfirmDialog'
import { EditTransactionDialog } from '../../Dialogs/Transactions/EditTransactionDialog'

import {
  StyledTransactionHeaderTableCell,
  StyledTransactionTable,
  StyledTransactionTableHead,
} from './styled'
import { TransactionRow } from './TransactionRow'
import { useTransactions } from './useTransactions'

interface TransactionTableProps {
  assetCode: string
  assetType: string
  positionId: string
  onTransactionChange: () => void
}

/**
 * @function TransactionTable
 * @description Component to display a table of transactions for a given asset position.
 * @param {TransactionTableProps} props - The props for the component.
 * @param {string} props.assetCode - The code of the asset.
 * @param {string} props.assetType - The type of the asset.
 * @param {string} props.positionId - The ID of the asset position.
 * @param {() => void} props.onTransactionChange - Callback function to be called when transactions change.
 * @returns {React.FC<TransactionTableProps>} A React functional component.
 */
export const TransactionTable: React.FC<TransactionTableProps> = ({
  assetCode,
  assetType,
  positionId,
  onTransactionChange,
}) => {
  const { transactions, loadingTransactions, errorTransactions, fetchTransactions } = useTransactions({
    positionId,
    onTransactionChange,
  })

  const [selectedTransactionForEdit, setSelectedTransactionForEdit] = useState<Transaction | null>(null)
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false)
  const [isDeleteTransactionOpen, setIsDeleteTransactionOpen] = useState(false)
  const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null)

  if (loadingTransactions) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <CircularProgress size={20} />
      </Box>
    )
  }

  if (errorTransactions) {
    return (
      <Box sx={{ margin: 1 }}>
        <Typography color="error">Erro ao carregar transações: {errorTransactions}</Typography>
      </Box>
    )
  }

  if (transactions.length === 0) {
    return (
      <Box sx={{ margin: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Nenhuma transação encontrada para este ativo.
        </Typography>
      </Box>
    )
  }

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransactionForEdit(transaction)
    setIsEditTransactionOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setTransactionToDeleteId(id)
    setIsDeleteTransactionOpen(true)
  }

  const handleTransactionSavedOrDeleted = () => {
    setIsEditTransactionOpen(false)
    setIsDeleteTransactionOpen(false)
    fetchTransactions() // Refetch transactions after save or delete
    onTransactionChange()
  }

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h4" align="center" gutterBottom component="div" sx={{ fontWeight: 'bold', my: 3 }}>
        Transações de {assetCode}
      </Typography>
      <StyledTransactionTable size="small" aria-label="purchases" sx={{ mt: 2, mb: 4 }}>
        <StyledTransactionTableHead>
          <TableRow>
            <StyledTransactionHeaderTableCell align="center">Tipo</StyledTransactionHeaderTableCell>
            <StyledTransactionHeaderTableCell align="center">Quantidade</StyledTransactionHeaderTableCell>
            <StyledTransactionHeaderTableCell align="center">Preço</StyledTransactionHeaderTableCell>
            <StyledTransactionHeaderTableCell align="center">Valor Total</StyledTransactionHeaderTableCell>
            <StyledTransactionHeaderTableCell align="center">Data</StyledTransactionHeaderTableCell>
            <StyledTransactionHeaderTableCell align="center">Ações</StyledTransactionHeaderTableCell>
          </TableRow>
        </StyledTransactionTableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction._id}
              transaction={transaction}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </TableBody>
      </StyledTransactionTable>
      <EditTransactionDialog
        open={isEditTransactionOpen}
        onClose={() => setIsEditTransactionOpen(false)}
        transaction={selectedTransactionForEdit}
        onSave={handleTransactionSavedOrDeleted}
        assetCode={assetCode}
        assetType={assetType}
      />
      <DeleteTransactionConfirmDialog
        open={isDeleteTransactionOpen}
        onClose={() => setIsDeleteTransactionOpen(false)}
        transactionId={transactionToDeleteId}
        positionId={positionId}
        onConfirm={handleTransactionSavedOrDeleted}
      />
    </Box>
  )
}
