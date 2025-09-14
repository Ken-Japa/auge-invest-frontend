import React, { useState, useEffect } from 'react';
import { Box, Typography, TableRow, TableBody, IconButton, CircularProgress, Tooltip } from '@mui/material';
import { EditTransactionDialog } from '../../Dialogs/Transactions/EditTransactionDialog';
import { DeleteTransactionConfirmDialog } from '../../Dialogs/Transactions/DeleteTransactionConfirmDialog';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Transaction } from '@/services/api/types/transaction';
import { formatDate2 as formatDate, formatCurrency } from '@/components/Utils/Formatters/formatters';
import { StyledTransactionTable, StyledTransactionTableHead, StyledTransactionTableCell, StyledTransactionTableRow, StyledTransactionHeaderTableCell } from './styled';

import { walletApi } from '@/services/api/endpoints/wallet';

interface TransactionTableProps {
    assetCode: string;
    assetType: string;
    positionId: string;
    onTransactionChange: () => void;
}


export const TransactionTable: React.FC<TransactionTableProps> = ({
    assetCode,
    assetType,
    positionId,
    onTransactionChange,
}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [errorTransactions, setErrorTransactions] = useState<string | null>(null);
    const [selectedTransactionForEdit, setSelectedTransactionForEdit] = useState<Transaction | null>(null);
    const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
    const [isDeleteTransactionOpen, setIsDeleteTransactionOpen] = useState(false);
    const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoadingTransactions(true);
            setErrorTransactions(null);
            try {
                const response = await walletApi.getTransactionsByPositionId(positionId);
                const orderedTransactions = response.result.sort((a, b) =>
                    new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime()
                );
                setTransactions(orderedTransactions);
            } catch (error: any) {
                setErrorTransactions(error.message);
            } finally {
                setLoadingTransactions(false);
            }
        };

        if (positionId) {
            fetchTransactions();
        }
    }, [positionId]);

    if (loadingTransactions) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <CircularProgress size={20} />
            </Box>
        );
    }

    if (errorTransactions) {
        return (
            <Box sx={{ margin: 1 }}>
                <Typography color="error">Erro ao carregar transações: {errorTransactions}</Typography>
            </Box>
        );
    }

    if (transactions.length === 0) {
        return (
            <Box sx={{ margin: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    Nenhuma transação encontrada para este ativo.
                </Typography>
            </Box>
        );
    }

    const handleEditClick = (transaction: Transaction) => {
        setSelectedTransactionForEdit(transaction);
        setIsEditTransactionOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setTransactionToDeleteId(id);
        setIsDeleteTransactionOpen(true);
    };

    const handleTransactionSavedOrDeleted = () => {
        setIsEditTransactionOpen(false);
        setIsDeleteTransactionOpen(false);
        onTransactionChange();
    };

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
                        <StyledTransactionTableRow key={transaction._id}>
                            <StyledTransactionTableCell align="center" component="th" scope="row">
                                {transaction.type === 'buy' ? 'Compra' : 'Venda'}
                            </StyledTransactionTableCell>
                            <StyledTransactionTableCell align="center">{transaction.quantity}</StyledTransactionTableCell>
                            <StyledTransactionTableCell align="center">{transaction.price.toFixed(2)}</StyledTransactionTableCell>
                            <StyledTransactionTableCell align="center">{formatCurrency((transaction.price * transaction.quantity).toFixed(2))}</StyledTransactionTableCell>
                            <StyledTransactionTableCell align="center">{formatDate(transaction.executedAt)}</StyledTransactionTableCell>
                            <StyledTransactionTableCell align="center">
                                <Tooltip title="Editar Transação">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEditClick(transaction)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Deletar Transação">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteClick(transaction._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </StyledTransactionTableCell>
                        </StyledTransactionTableRow>
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
    );
};