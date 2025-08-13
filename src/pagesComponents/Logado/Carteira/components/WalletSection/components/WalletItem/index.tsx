import React, { useState, useEffect } from 'react';
import { WalletTransactions, WalletTransaction } from '@/services/api/types/transaction';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, CircularProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
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

    const [isDeleteTransactionOpen, setIsDeleteTransactionOpen] = useState(false);
    const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null);
    const [isTransactionsDialogOpen, setIsTransactionsDialogOpen] = useState(false);
    const [selectedAssetPositionId, setSelectedAssetPositionId] = useState<string | null>(null);
    const [assetCode, setAssetCode] = useState<string | null>(null);
    const [assetType, setAssetType] = useState<string | null>(null);


    useEffect(() => {
        if (expanded) {
            fetchWalletPositions(wallet._id);
        }
    }, [expanded, wallet._id, fetchWalletPositions]);


    const handleTransactionSavedOrDeleted = () => {
        fetchWalletPositions(wallet._id);
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

                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
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
                                {walletPositions.result.map((position) => (
                                    <TableRow key={position._id}>
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
                                        <TableCell align="center">{position.averagePrice}</TableCell>
                                        <TableCell align="center">{(position.quantity * position.averagePrice)}</TableCell>
                                        <TableCell align="center">Implementar</TableCell>
                                        <TableCell align="center">Implementar</TableCell>
                                        <TableCell align="center">{assetTypes.find(type => type.value === position.assetType)?.label || position.assetType}</TableCell>
                                        <TableCell align="center">{formatDate(position.createdAt)}</TableCell>
                                    </TableRow>
                                ))}
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