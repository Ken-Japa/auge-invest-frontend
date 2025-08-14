import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, CircularProgress, TableContainer, Paper, Table, TableRow, TableCell, TableBody, IconButton, Button, Tooltip } from '@mui/material';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, CloseButton, StyledAssetTableHead, StyledAssetTableHeaderCell, StyledAssetTableRow } from './styled';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { walletApi } from '@/services/api/endpoints/wallet';
import { Transaction } from '@/services/api/types/transaction';
import { formatDate2 as formatDate } from '@/components/Utils/Formatters/formatters';
import { AddSameTransactionDialog } from '../AddTransactionSameAsset';
import { EditTransactionDialog } from '../EditTransactionDialog';
import { DeleteTransactionConfirmDialog } from '../DeleteTransactionConfirmDialog';

interface TransactionsDialogProps {
    open: boolean;
    onClose: () => void;
    assetId: string | null;
    onSave: () => void;
    userId: string;
    assetCode: string | null;
    assetType: string | null;
}

export const TransactionsDialog: React.FC<TransactionsDialogProps> = ({
    open,
    onClose,
    assetId,
    onSave,
    userId,
    assetCode,
    assetType
}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
    const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
    const [selectedTransactionForEdit, setSelectedTransactionForEdit] = useState<Transaction | null>(null);
    const [isDeleteTransactionOpen, setIsDeleteTransactionOpen] = useState(false);
    const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        if (!assetId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await walletApi.getTransactionsByPositionId(assetId);
            const orderedTransactions = response.result.sort((a, b) =>
                new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime()
            );
            setTransactions(orderedTransactions);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    }, [assetId]);

    useEffect(() => {
        if (open && assetId) {
            fetchTransactions();
        }
    }, [open, assetId, fetchTransactions]);

    const handleTransactionSavedOrDeleted = () => {
        fetchTransactions();
        onSave();
    };

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <StyledDialogTitle>Transações do Ativo {assetCode}</StyledDialogTitle>
            <StyledDialogContent>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setIsAddTransactionOpen(true)}
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
                    <TableContainer component={Paper} >
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
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setSelectedTransactionForEdit(transaction);
                                                        setIsEditTransactionOpen(true);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Deletar Transação">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => {
                                                        setTransactionToDeleteId(transaction._id);
                                                        setIsDeleteTransactionOpen(true);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </StyledAssetTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>Nenhuma transação encontrada para este ativo.</Typography>
                )}

                <AddSameTransactionDialog
                    open={isAddTransactionOpen}
                    onClose={() => setIsAddTransactionOpen(false)}
                    userId={userId}
                    positionId={assetId}
                    assetCode={assetCode}
                    assetType={assetType}
                    onSave={handleTransactionSavedOrDeleted}
                />

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
                    positionId={assetId}
                    transactionId={transactionToDeleteId}
                    onConfirm={handleTransactionSavedOrDeleted}
                />
            </StyledDialogContent>
            <StyledDialogActions>
                <CloseButton onClick={onClose}>Fechar</CloseButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};