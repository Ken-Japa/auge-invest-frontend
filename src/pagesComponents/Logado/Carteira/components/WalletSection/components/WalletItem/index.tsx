import { Add as AddIcon, Delete as DeleteIcon,Edit as EditIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Tooltip,Typography } from '@mui/material';
import React, { useEffect,useState } from 'react';

import { Wallet } from '@/services/api/types';
import { WalletTransactions } from '@/services/api/types/transaction';
import { useTheme } from '@/theme/ThemeContext';

import { useFocus } from '../../../RecentActivities/components/FocusContext/FocusContext';
import { AddTransactionDialog } from '../Dialogs/Transactions/AddTransactionDialog';
import { AddSameTransactionDialog } from '../Dialogs/Transactions/AddTransactionSameAsset';
import { TransactionsDialog } from '../Dialogs/Transactions/TransactionsDialog';
import { AssetPositionsTable } from './AssetPositionsTable';
import { EditButton, WalletActions, WalletDetailsContainer,WalletItemContainer, WalletSummaryContainer } from './styled';


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
    const { isDarkMode } = useTheme();
    const accordionSummaryBackground = isDarkMode ? "linear-gradient(to right, #0A1929, #163451 95%)" : "linear-gradient(to right, #ffffff, #f5f7fa 95%)";
    const accordionDetailsBackground = isDarkMode ? "#223B54" : "#faf6f0";
    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
    const [isAddSameTransactionOpen, setIsAddSameTransactionOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [isTransactionsDialogOpen, setIsTransactionsDialogOpen] = useState(false);
    const [selectedAssetPositionId, setSelectedAssetPositionId] = useState<string | null>(null);
    const [assetCode, setAssetCode] = useState<string | null>(null);
    const [assetType, setAssetType] = useState<string | null>(null);

    const { focusedAssetCode } = useFocus();


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
                    sx={{ background: accordionSummaryBackground }}
                >
                    <WalletSummaryContainer >
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                        }}>
                            <Typography variant="h4" color="text.primary" sx={{ flexGrow: 1 }}>
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
                    sx={{ background: accordionDetailsBackground }}>
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
                            focusedAssetCode={focusedAssetCode}
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