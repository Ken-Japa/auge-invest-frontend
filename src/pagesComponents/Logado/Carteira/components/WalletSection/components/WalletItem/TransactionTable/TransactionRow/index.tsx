import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

import { formatCurrency, formatDate2 as formatDate } from '@/components/Helpers/Formatters/formatters'
import { Transaction } from '@/services/api/types/transaction'

import { StyledTransactionTableCell, StyledTransactionTableRow } from './styled'

interface TransactionRowProps {
  transaction: Transaction
  onEditClick: (transaction: Transaction) => void
  onDeleteClick: (id: string) => void
}

/**
 * @function TransactionRow
 * @description Component to render a single row of the transaction table.
 * @param {TransactionRowProps} props - The props for the component.
 * @param {Transaction} props.transaction - The transaction object to display.
 * @param {(transaction: Transaction) => void} props.onEditClick - Callback function for editing a transaction.
 * @param {(id: string) => void} props.onDeleteClick - Callback function for deleting a transaction.
 * @returns {React.FC<TransactionRowProps>} A React functional component.
 */
export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <StyledTransactionTableRow key={transaction._id}>
      <StyledTransactionTableCell align="center" component="th" scope="row">
        {transaction.type === 'buy' ? 'Compra' : 'Venda'}
      </StyledTransactionTableCell>
      <StyledTransactionTableCell align="center">{transaction.quantity}</StyledTransactionTableCell>
      <StyledTransactionTableCell align="center">{transaction.price.toFixed(2)}</StyledTransactionTableCell>
      <StyledTransactionTableCell
        align="center"
        sx={{
          color: transaction.type === 'buy' ? 'error.main' : 'success.main',
        }}
      >
        {formatCurrency(
          (transaction.type === 'buy'
            ? -(transaction.price * transaction.quantity)
            : transaction.price * transaction.quantity
          ).toFixed(2),
        )}
      </StyledTransactionTableCell>
      <StyledTransactionTableCell align="center">
        {formatDate(transaction.executedAt)}
      </StyledTransactionTableCell>
      <StyledTransactionTableCell align="center">
        <Tooltip title="Editar Transação">
          <IconButton color="primary" onClick={() => onEditClick(transaction)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar Transação">
          <IconButton color="error" onClick={() => onDeleteClick(transaction._id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </StyledTransactionTableCell>
    </StyledTransactionTableRow>
  )
}
