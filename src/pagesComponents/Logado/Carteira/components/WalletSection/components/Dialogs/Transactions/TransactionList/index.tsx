import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@mui/material'
import React from 'react'

import { formatDate2 as formatDate } from '@/components/Helpers/Formatters/formatters'
import { Transaction } from '@/services/api/types/transaction'

import { StyledAssetTableHead, StyledAssetTableHeaderCell, StyledAssetTableRow } from './styled'

interface TransactionListProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (transactionId: string) => void
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <StyledAssetTableHead>
          <TableRow>
            <StyledAssetTableHeaderCell>Tipo</StyledAssetTableHeaderCell>
            <StyledAssetTableHeaderCell align="center">Quantidade</StyledAssetTableHeaderCell>
            <StyledAssetTableHeaderCell align="center">Preço</StyledAssetTableHeaderCell>
            <StyledAssetTableHeaderCell align="center">Data</StyledAssetTableHeaderCell>
            <StyledAssetTableHeaderCell align="center">Ações</StyledAssetTableHeaderCell>
          </TableRow>
        </StyledAssetTableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <StyledAssetTableRow key={transaction._id}>
              <TableCell>{transaction.type === 'buy' ? 'Compra' : 'Venda'}</TableCell>
              <TableCell align="center">{transaction.quantity}</TableCell>
              <TableCell align="center">{transaction.price}</TableCell>
              <TableCell align="center">{formatDate(transaction.executedAt)}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar Transação">
                  <IconButton color="primary" onClick={() => onEdit(transaction)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Deletar Transação">
                  <IconButton color="error" onClick={() => onDelete(transaction._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </StyledAssetTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
