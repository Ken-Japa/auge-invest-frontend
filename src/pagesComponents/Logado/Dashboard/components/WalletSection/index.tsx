import { useEffect, useState } from 'react';
import { Wallet } from '@/services/api/types';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import {
    Add as AddIcon,
} from '@mui/icons-material';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { useWalletData } from './hooks/useWalletData';
import { WalletContent } from './components/WalletContent';

interface WalletSectionProps {
    title: string;
}

export const WalletSection: React.FC<WalletSectionProps> = ({ title }) => {
    const { wallets, loading, error, fetchWallets, handleCreateWallet, handleUpdateWallet, handleConfirmDelete, walletPositions, loadingPositions, errorPositions, fetchWalletPositions } = useWalletData();

    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
    const [walletToDelete, setWalletToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchWallets();
    }, [fetchWallets]);

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleCreateWalletAndCloseDialog = async (name: string, description: string) => {
        await handleCreateWallet(name, description);
        handleCloseAddDialog();
    };

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEditWallet = (wallet: Wallet) => {
        setEditingWallet(wallet);
        setOpenEditDialog(true);
    };

    const handleUpdateWalletAndCloseDialog = async (walletId: string, name: string, description: string) => {
        await handleUpdateWallet(walletId, name, description);
        setOpenEditDialog(false);
        setEditingWallet(null);
    };

    const handleDeleteWallet = (walletId: string) => {
        setWalletToDelete(walletId);
        setOpenDeleteConfirm(true);
    };

    const handleConfirmDeleteAndCloseDialog = async () => {
        await handleConfirmDelete(walletToDelete as string);
        setOpenDeleteConfirm(false);
        setWalletToDelete(null);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditingWallet(null);
    };

    const handleCloseDeleteConfirm = () => {
        setOpenDeleteConfirm(false);
        setWalletToDelete(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Render the error message if an error exists, but still allow the button to be displayed
    const errorMessageDisplay = error ? (
        <Box sx={{ color: 'error.main', textAlign: 'center', mt: 4, mb: 2 }}>
            <Typography variant="h6">Error: {error}</Typography>
            <Button onClick={fetchWallets} variant="outlined" sx={{ mt: 2 }}>
                Retry
            </Button>
        </Box>
    ) : null;

    return (
        <ErrorBoundary>
            <SuspenseWrapper>
                <ProgressiveLoad delay={0.2}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h3" gutterBottom>{title}</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddDialog}
                            sx={{ mb: 2 }}
                        >
                            Nova Carteira
                        </Button>
                        {wallets.length === 0 ? (
                            <Typography>Nenhuma carteira encontrada.</Typography>
                        ) : (
                            <Box>
                                <WalletContent
                                    wallets={wallets}
                                    expanded={expanded}
                                    onAccordionChange={handleAccordionChange}
                                    onEdit={handleEditWallet}
                                    onDelete={handleDeleteWallet}
                                    openAddDialog={openAddDialog}
                                    onCloseAddDialog={handleCloseAddDialog}
                                    onCreateWallet={handleCreateWalletAndCloseDialog}
                                    loading={loading}
                                    error={error}
                                    openEditDialog={openEditDialog}
                                    onCloseEditDialog={handleCloseEditDialog}
                                    onUpdateWallet={handleUpdateWalletAndCloseDialog}
                                    editingWallet={editingWallet}
                                    openDeleteConfirm={openDeleteConfirm}
                                    onCloseDeleteConfirm={handleCloseDeleteConfirm}
                                    onConfirmDelete={handleConfirmDeleteAndCloseDialog}
                                    walletPositions={walletPositions}
                                    loadingPositions={loadingPositions}
                                    errorPositions={errorPositions}
                                    fetchWalletPositions={fetchWalletPositions}
                                />
                            </Box>
                        )}

                    </Box>
                </ProgressiveLoad>
            </SuspenseWrapper>
        </ErrorBoundary >
    );
};