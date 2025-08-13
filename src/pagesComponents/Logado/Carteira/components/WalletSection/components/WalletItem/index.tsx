import React, { useState, useEffect, useCallback } from 'react';

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, CircularProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Add as AddIcon, KeyboardArrowDown, KeyboardArrowUp, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Wallet } from '@/services/api/types';
import { WalletTransactions, Transaction } from '@/services/api/types/transaction';
import { walletApi } from '@/services/api/endpoints/wallet';

import { formatDate2 as formatDate } from '@/components/Utils/Formatters/formatters';

import { AddTransactionDialog, assetTypes } from '../Dialogs/Transactions/AddTransactionDialog';
import { AddSameTransactionDialog } from '../Dialogs/Transactions/AddTransactionSameAsset';
import { EditTransactionDialog } from '../Dialogs/Transactions/EditTransactionDialog';
import { DeleteTransactionConfirmDialog } from '../Dialogs/Transactions/DeleteTransactionConfirmDialog';
import { TransactionsDialog } from '../Dialogs/Transactions/TransactionsDialog';

import { StyledAccordionSummary, StyledAssetTableContainer, StyledAssetTable, StyledAssetTableHead, StyledTransactionTableCell, StyledTransactionTableRow, StyledAssetTableCell, StyledAssetTableRow, StyledTransactionTable, StyledTransactionTableHead } from './styled';


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
    const [isAddSameTransactionOpen, setIsAddSameTransactionOpen] = useState(false);
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
            <StyledAccordionSummary
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
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {wallet.description}
                        </Typography>
                    </Typography>

                </Box>

            </StyledAccordionSummary>
            <AccordionDetails>

                <Box sx={{ my: 2, display: 'flex', justifyContent: 'flex-start' }}>

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
                    <StyledAssetTableContainer>
                        <StyledAssetTable size="small">
                            <StyledAssetTableHead>
                                <StyledAssetTableRow>
                                    <StyledAssetTableCell>Ativo</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Quantidade</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Preço</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Valor Gasto</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Valor Atual</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Diferença</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Tipo</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Data Início</StyledAssetTableCell>
                                    <StyledAssetTableCell align="center">Ações</StyledAssetTableCell>
                                </StyledAssetTableRow>
                            </StyledAssetTableHead>
                            <TableBody>
                                {walletPositions.result.map((position) => {
                                    const isRowExpanded = expandedRows.includes(position._id);
                                    return (
                                        <React.Fragment key={position._id}>
                                            <StyledAssetTableRow>
                                                <StyledAssetTableCell
                                                    onClick={() => {
                                                        setSelectedAssetPositionId(position._id);
                                                        setIsTransactionsDialogOpen(true);
                                                        setAssetCode(position.assetCode);
                                                        setAssetType(position.assetType);
                                                    }}
                                                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    {position.assetCode}
                                                </StyledAssetTableCell>
                                                <StyledAssetTableCell align="center">{position.quantity}</StyledAssetTableCell>
                                                <StyledAssetTableCell align="center">{position.averagePrice.toFixed(2)}</StyledAssetTableCell>
                                                <StyledAssetTableCell align="center">{(position.quantity * position.averagePrice).toFixed(2)}</StyledAssetTableCell>
                                                <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
                                                <StyledAssetTableCell align="center">Implementar</StyledAssetTableCell>
                                                <StyledAssetTableCell align="center">{assetTypes.find(type => type.value === position.assetType)?.label || position.assetType}</StyledAssetTableCell>
                                                <StyledAssetTableCell align="center">{formatDate(position.createdAt)}</StyledAssetTableCell>
                                                <StyledAssetTableCell>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => {
                                                            handleToggleRow(position._id);
                                                            setSelectedAssetPositionId(position._id);
                                                            setAssetCode(position.assetCode);
                                                            setAssetType(position.assetType);
                                                        }}
                                                    >
                                                        {isRowExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => {
                                                            setIsAddSameTransactionOpen(true)
                                                            setSelectedAssetPositionId(position._id);
                                                            setAssetCode(position.assetCode);
                                                            setAssetType(position.assetType);
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </StyledAssetTableCell>

                                            </StyledAssetTableRow>
                                            {isRowExpanded && (
                                                loadingTransactions ? (
                                                    <StyledTransactionTableRow>
                                                        <StyledAssetTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                                                                <CircularProgress size={20} />
                                                            </Box>
                                                        </StyledAssetTableCell>
                                                    </StyledTransactionTableRow>
                                                ) : errorTransactions ? (
                                                    <StyledTransactionTableRow>
                                                        <StyledTransactionTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography color="error">Erro ao carregar transações: {errorTransactions}</Typography>
                                                            </Box>
                                                        </StyledTransactionTableCell>
                                                    </StyledTransactionTableRow>
                                                ) : transactions.length > 0 ? (
                                                    <StyledTransactionTableRow>
                                                        <StyledTransactionTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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
                                                                            <StyledTransactionTableCell align="right" >Ações</StyledTransactionTableCell>
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
                                                                                </StyledTransactionTableCell>

                                                                            </StyledTransactionTableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </StyledTransactionTable>
                                                            </Box>
                                                        </StyledTransactionTableCell>
                                                    </StyledTransactionTableRow>
                                                ) : (
                                                    <StyledAssetTableRow>
                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Nenhuma transação encontrada para este ativo.
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </StyledAssetTableRow>

                                                ))}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </StyledAssetTable>
                    </StyledAssetTableContainer>
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
                <AddSameTransactionDialog
                    open={isAddSameTransactionOpen}
                    onClose={() => setIsAddSameTransactionOpen(false)}
                    userId={wallet.userId}
                    positionId={selectedAssetPositionId}
                    assetCode={assetCode}
                    assetType={assetType}
                    onSave={handleTransactionSavedOrDeleted}
                />
            </AccordionDetails>
        </Accordion>

    );
};