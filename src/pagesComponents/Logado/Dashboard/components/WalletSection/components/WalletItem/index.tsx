// Initial content for WalletItem.tsx
import React, { useState, useEffect } from 'react';
import { WalletTransactions } from '@/services/api/types/transaction';
import { Box, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Button, CircularProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, Add as AddIcon } from '@mui/icons-material';
import { Wallet } from '@/services/api/types';
import { formatDate } from '@/components/Utils/Formatters/formatters'
import { AddTransactionDialog } from '../AddTransactionDialog';


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

    useEffect(() => {
        if (expanded) {
            fetchWalletPositions(wallet._id);
        }
    }, [expanded, wallet._id, fetchWalletPositions]);

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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
                    <IconButton
                        aria-label="edit"
                        onClick={(event) => {
                            event.stopPropagation();
                            onEdit(wallet);
                        }}
                        size="small"
                        component="div"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete(wallet._id);
                        }}
                        size="small"
                        color="error"
                        component="div"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
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
                                    <TableCell align="center">Preço Médio</TableCell>
                                    <TableCell align="center">Tipo</TableCell>
                                    <TableCell align="center">Data Início</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {walletPositions.result.map((position) => (
                                    <TableRow key={position._id}>
                                        <TableCell>{position.assetCode}</TableCell>
                                        <TableCell align="center">{position.quantity}</TableCell>
                                        <TableCell align="center">{position.averagePrice}</TableCell>
                                        <TableCell align="center">{position.assetType}</TableCell>
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
                />
            </AccordionDetails>
        </Accordion>

    );
};