import React, { useState, useEffect } from 'react';
import { Box, Typography, TableRow, TableBody, IconButton, CircularProgress } from '@mui/material';
import { EditTransactionDialog } from '../../Dialogs/Transactions/EditTransactionDialog';
import { DeleteTransactionConfirmDialog } from '../../Dialogs/Transactions/DeleteTransactionConfirmDialog';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Transaction } from '@/services/api/types/transaction';
import { formatDate2 as formatDate } from '@/components/Utils/Formatters/formatters';
import { StyledTransactionTable, StyledTransactionTableHead, StyledTransactionTableCell, StyledTransactionTableRow } from './styled';

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
                setTransactions(response.result);
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
            <Typography variant="h4" gutterBottom component="div">
                Transações de {assetCode}
            </Typography>
            <StyledTransactionTable size="small" aria-label="purchases">
                <StyledTransactionTableHead>
                    <TableRow>
                        <StyledTransactionTableCell>Tipo</StyledTransactionTableCell>
                        <StyledTransactionTableCell>Quantidade</StyledTransactionTableCell>
                        <StyledTransactionTableCell align="right">Preço</StyledTransactionTableCell>
                        <StyledTransactionTableCell align="right">Data</StyledTransactionTableCell>
                        <StyledTransactionTableCell align="right">Ações</StyledTransactionTableCell>
                    </TableRow>
                </StyledTransactionTableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <StyledTransactionTableRow key={transaction._id}>
                            <StyledTransactionTableCell component="th" scope="row">
                                {transaction.type === 'buy' ? 'Compra' : 'Venda'}
                            </StyledTransactionTableCell>
                            <StyledTransactionTableCell>{transaction.quantity}</StyledTransactionTableCell>
                            <StyledTransactionTableCell align="right">{transaction.price.toFixed(2)}</StyledTransactionTableCell>
                            <StyledTransactionTableCell align="right">{formatDate(transaction.executedAt)}</StyledTransactionTableCell>
                            <StyledTransactionTableCell align="right">
                                <IconButton
                                    color="primary"
                                    onClick={() => handleEditClick(transaction)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteClick(transaction._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
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