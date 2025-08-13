import React, { useState, useEffect, useCallback } from 'react';

import { WalletTransactions, Transaction } from '@/services/api/types/transaction';
import { walletApi } from '@/services/api/endpoints/wallet';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, CircularProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Add as AddIcon, KeyboardArrowDown, KeyboardArrowUp, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Wallet } from '@/services/api/types';
import { formatDate2 as formatDate } from '@/components/Utils/Formatters/formatters'
import { AddTransactionDialog, assetTypes } from '../Dialogs/Transactions/AddTransactionDialog';
import { EditTransactionDialog } from '../Dialogs/Transactions/EditTransactionDialog';
import { DeleteTransactionConfirmDialog } from '../Dialogs/Transactions/DeleteTransactionConfirmDialog';
import { TransactionsDialog } from '../Dialogs/Transactions/TransactionsDialog';


interface WalletItemProps {
    wallet: Wallet;
    expanded: boolean;
    onAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onEdit: (wallet: Wallet) => void;
    onDelete: (walletId: string) => void;
    walletPositions: WalletTransactions | null;
    loadingPositions: boolean;
    errorPositions: string | null;
    fetchWalletPositions: (walletId: string) => Promise<void>;
}

export const WalletItem: React.FC<WalletItemProps> = ({
    wallet,
    expanded,
    onAccordionChange,
    onEdit,
    onDelete,
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
}) => {
    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    const [isDeleteTransactionOpen, setIsDeleteTransactionOpen] = useState(false);
    const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null);
    const [isTransactionsDialogOpen, setIsTransactionsDialogOpen] = useState(false);
    const [selectedAssetPositionId, setSelectedAssetPositionId] = useState<string | null>(null);
    const [assetCode, setAssetCode] = useState<string | null>(null);
    const [assetType, setAssetType] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [errorTransactions, setErrorTransactions] = useState<string | null>(null);
    const [selectedTransactionForEdit, setSelectedTransactionForEdit] = useState<Transaction | null>(null);
    const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);

    const fetchTransactions = useCallback(async (positionId: string) => {
        if (!positionId) return;
        setLoadingTransactions(true);
        setErrorTransactions(null);
        try {
            const response = await walletApi.getTransactionsByPositionId(positionId);
            setTransactions(response.result);
        } catch (err: any) {
            setErrorTransactions(err.message || 'Failed to fetch transactions');
        } finally {
            setLoadingTransactions(false);
        }
    }, []);

    useEffect(() => {
        if (expanded) {
            fetchWalletPositions(wallet._id);
        }
    }, [expanded, wallet._id, fetchWalletPositions]);



    const handleTransactionSavedOrDeleted = () => {
        fetchWalletPositions(wallet._id);
        if (selectedAssetPositionId) {
            fetchTransactions(selectedAssetPositionId);
        }
    };

    const handleToggleRow = (positionId: string) => {
        setExpandedRows(prev => {
            const isCurrentlyExpanded = prev.includes(positionId);
            if (!isCurrentlyExpanded) {
                fetchTransactions(positionId);
            }
            return isCurrentlyExpanded ? prev.filter(id => id !== positionId) : [...prev, positionId];
        });
    };

    return (
        <Accordion expanded={expanded} onChange={onAccordionChange(wallet._id)} key={wallet._id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${wallet._id}-content`}
                id={`panel-${wallet._id}-header`}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        {wallet.name}
                        <Typography variant="body2" color="text.secondary">
                            {wallet.description}
                        </Typography>
                    </Typography>

                </Box>

            </AccordionSummary>
            <AccordionDetails>

                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedPosition(wallet._id);
                            setIsAddTransactionOpen(true);
                        }}
                    >
                        Cadastrar Operação
                    </Button>
                </Box>

                {loadingPositions ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                        <CircularProgress />
                    </Box>
                ) : errorPositions ? (
                    <Typography color="error">Erro ao carregar operações: {errorPositions}</Typography>
                ) : walletPositions && walletPositions.result.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Ativo</TableCell>
                                    <TableCell align="center">Quantidade</TableCell>
                                    <TableCell align="center">Preço</TableCell>
                                    <TableCell align="center">Valor Gasto</TableCell>
                                    <TableCell align="center">Valor Atual</TableCell>
                                    <TableCell align="center">Diferença</TableCell>
                                    <TableCell align="center">Tipo</TableCell>
                                    <TableCell align="center">Data Início</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {walletPositions.result.map((position) => {
                                    const isRowExpanded = expandedRows.includes(position._id);
                                    return (
                                        <React.Fragment key={position._id}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => {
                                                            handleToggleRow(position._id);
                                                            setSelectedAssetPositionId(position._id);
                                                            setAssetCode(position.assetCode);
                                                        }}
                                                    >
                                                        {isRowExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell
                                                    onClick={() => {
                                                        setSelectedAssetPositionId(position._id);
                                                        setIsTransactionsDialogOpen(true);
                                                        setAssetCode(position.assetCode);
                                                        setAssetType(position.assetType);
                                                    }}
                                                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    {position.assetCode}
                                                </TableCell>
                                                <TableCell align="center">{position.quantity}</TableCell>
                                                <TableCell align="center">{position.averagePrice.toFixed(2)}</TableCell>
                                                <TableCell align="center">{(position.quantity * position.averagePrice).toFixed(2)}</TableCell>
                                                <TableCell align="center">Implementar</TableCell>
                                                <TableCell align="center">Implementar</TableCell>
                                                <TableCell align="center">{assetTypes.find(type => type.value === position.assetType)?.label || position.assetType}</TableCell>
                                                <TableCell align="center">{formatDate(position.createdAt)}</TableCell>
                                            </TableRow>
                                            {isRowExpanded && (
                                                loadingTransactions ? (
                                                    <TableRow>
                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                                                                <CircularProgress size={20} />
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : errorTransactions ? (
                                                    <TableRow>
                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography color="error">Erro ao carregar transações: {errorTransactions}</Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : transactions.length > 0 ? (
                                                    <TableRow>
                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography variant="h5" gutterBottom component="div">
                                                                    Transações {assetCode}

                                                                </Typography>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Tipo</TableCell>
                                                                            <TableCell>Quantidade</TableCell>
                                                                            <TableCell align="right">Preço</TableCell>
                                                                            <TableCell align="right">Data</TableCell>
                                                                            <TableCell align="right" >Ações</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {transactions.map((transaction) => (
                                                                            <TableRow key={transaction._id}>
                                                                                <TableCell component="th" scope="row">
                                                                                    {transaction.type === 'buy' ? 'Compra' : 'Venda'}
                                                                                </TableCell>
                                                                                <TableCell>{transaction.quantity}</TableCell>
                                                                                <TableCell align="right">{transaction.price.toFixed(2)}</TableCell>
                                                                                <TableCell align="right">{formatDate(transaction.executedAt)}</TableCell>
                                                                                <TableCell align="right">
                                                                                    <IconButton
                                                                                        color="primary"
                                                                                        onClick={() => {
                                                                                            setSelectedTransactionForEdit(transaction);
                                                                                            setIsEditTransactionOpen(true);
                                                                                        }}
                                                                                    >
                                                                                        <EditIcon />
                                                                                    </IconButton>
                                                                                    <IconButton
                                                                                        color="error"
                                                                                        onClick={() => {
                                                                                            setTransactionToDeleteId(transaction._id);
                                                                                            setIsDeleteTransactionOpen(true);
                                                                                        }}
                                                                                    >
                                                                                        <DeleteIcon />
                                                                                    </IconButton>
                                                                                </TableCell>

                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    <TableRow>
                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Nenhuma transação encontrada para este ativo.
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>Nenhuma operação encontrada para esta carteira.</Typography>
                )}

                <AddTransactionDialog
                    open={isAddTransactionOpen}
                    onClose={() => setIsAddTransactionOpen(false)}
                    positionId={selectedPosition}
                    userId={wallet.userId}
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
                    transactionId={transactionToDeleteId}
                    positionId={selectedPosition}
                    onConfirm={handleTransactionSavedOrDeleted}
                />

                <TransactionsDialog
                    open={isTransactionsDialogOpen}
                    onClose={() => setIsTransactionsDialogOpen(false)}
                    userId={wallet.userId}
                    assetId={selectedAssetPositionId}
                    onSave={handleTransactionSavedOrDeleted}
                    assetCode={assetCode}
                    assetType={assetType}
                />
            </AccordionDetails>
        </Accordion>

    );
};