import React, { useState, useEffect } from 'react';

import { Box, Typography, Accordion, AccordionDetails, Button, AccordionSummary, Tooltip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Wallet } from '@/services/api/types';
import { WalletTransactions } from '@/services/api/types/transaction';
import { AddTransactionDialog } from '../Dialogs/Transactions/AddTransactionDialog';
import { AddSameTransactionDialog } from '../Dialogs/Transactions/AddTransactionSameAsset';
import { TransactionsDialog } from '../Dialogs/Transactions/TransactionsDialog';

import { WalletItemContainer, WalletActions, EditButton, WalletSummaryContainer, WalletDetailsContainer } from './styled';
import { AssetPositionsTable } from './AssetPositionsTable';


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
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
    onEdit,
    onDelete,
}) => {
    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
    const [isAddSameTransactionOpen, setIsAddSameTransactionOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
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

    const handleToggleRow = (positionId: string) => {
        setExpandedRows(prev => {
            const isCurrentlyExpanded = prev.includes(positionId);

            return isCurrentlyExpanded ? prev.filter(id => id !== positionId) : [...prev, positionId];
        });
    };

    return (
        <WalletItemContainer>
            <Accordion expanded={expanded} onChange={onAccordionChange(wallet._id)} key={wallet._id}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${wallet._id}-content`}
                    id={`panel-${wallet._id}-header`}
                    sx={{ background: "linear-gradient(to right, #0A1929, #163451 95%)" }}
                >
                    <WalletSummaryContainer >
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                        }}>
                            <Typography variant="h4" sx={{ flexGrow: 1 }}>
                                {wallet.name}
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {wallet.description}
                                </Typography>
                            </Typography>
                            <WalletActions >
                                <Tooltip title="Editar Carteira">
                                    <EditButton onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(wallet);
                                    }}>
                                        <EditIcon />
                                    </EditButton>
                                </Tooltip>
                                <Tooltip title="Excluir Carteira">
                                    <EditButton onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(wallet._id);
                                    }} sx={{ ml: 2 }}>
                                        <DeleteIcon sx={{ color: 'error.main' }} />
                                    </EditButton>
                                </Tooltip>
                            </WalletActions>
                        </Box>
                    </WalletSummaryContainer>
                </AccordionSummary>
                <AccordionDetails
                    sx={{ background: "#223B54" }}>
                    <WalletDetailsContainer>

                        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
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

                        <AssetPositionsTable
                            walletPositions={walletPositions}
                            loadingPositions={loadingPositions}
                            errorPositions={errorPositions}
                            expandedRows={expandedRows}
                            handleToggleRow={handleToggleRow}
                            setSelectedAssetPositionId={setSelectedAssetPositionId}
                            setIsTransactionsDialogOpen={setIsTransactionsDialogOpen}
                            setAssetCode={setAssetCode}
                            setAssetType={setAssetType}
                            setIsAddSameTransactionOpen={setIsAddSameTransactionOpen}
                            onTransactionChange={handleTransactionSavedOrDeleted}
                        />

                        <AddTransactionDialog
                            open={isAddTransactionOpen}
                            onClose={() => setIsAddTransactionOpen(false)}
                            positionId={selectedPosition}
                            userId={wallet.userId}
                            onSave={handleTransactionSavedOrDeleted}
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
                    </WalletDetailsContainer>
                </AccordionDetails>
            </Accordion>
        </WalletItemContainer>

    );
};