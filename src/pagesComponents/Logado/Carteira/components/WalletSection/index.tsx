import { useEffect, useState } from 'react';

import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';

import { Wallet } from '@/services/api/types';

import { useWalletData } from './hooks/useWalletData';
import { WalletContent } from './components/WalletContent';
import { WalletDialogs } from './components/Dialogs/Wallet/WalletDialogs';
import { WalletDeleteDialog } from './components/Dialogs/Wallet/WalletDeleteDialog';


interface WalletSectionProps {
    title: string;
    isSimulated?: boolean;
}

export const WalletSection: React.FC<WalletSectionProps> = ({ title, isSimulated }) => {
    const { wallets, loading, error, fetchWallets, handleCreateWallet, handleUpdateWallet, handleConfirmDelete, walletPositions, loadingPositions, errorPositions, fetchWalletPositions } = useWalletData(isSimulated);

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

    const handleCreateWalletAndCloseDialog = async (name: string, description: string, simulated: boolean) => {
        await handleCreateWallet(name, description, simulated);
        handleCloseAddDialog();
    };

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEditWallet = (wallet: Wallet) => {
        setEditingWallet(wallet);
        setOpenEditDialog(true);
    };

    const handleUpdateWalletAndCloseDialog = async (walletId: string, name: string, description: string, simulated: boolean) => {
        await handleUpdateWallet(walletId, name, description, simulated);
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

    return (
        <ErrorBoundary>
            <SuspenseWrapper>
                <ProgressiveLoad delay={0.2}>
                    <Box sx={{ my: 4 }}>
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <CircularProgress />
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
                            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>
                                {title}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleOpenAddDialog}
                            >
                                {isSimulated ? 'Nova Simulação' : 'Nova Carteira'}
                            </Button>
                        </Box>
                        {wallets.length === 0 && !loading && !error ? (
                            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', my: 4 }}>
                                Nenhuma carteira encontrada. Crie uma nova para começar!
                            </Typography>
                        ) : (
                            <WalletContent
                                wallets={wallets}
                                expanded={expanded}
                                onAccordionChange={handleAccordionChange}
                                onEdit={handleEditWallet}
                                onDelete={handleDeleteWallet}
                                isSimulated={isSimulated}
                                loading={loading}
                                error={error}

                                walletPositions={walletPositions}
                                loadingPositions={loadingPositions}
                                errorPositions={errorPositions}
                                fetchWalletPositions={fetchWalletPositions}
                            />
                        )}

                        <WalletDialogs
                            openAddDialog={openAddDialog}
                            onCloseAddDialog={handleCloseAddDialog}
                            onCreateWallet={handleCreateWalletAndCloseDialog}
                            openEditDialog={openEditDialog}
                            onCloseEditDialog={handleCloseEditDialog}
                            onUpdateWallet={handleUpdateWalletAndCloseDialog}
                            editingWallet={editingWallet}
                            loading={loading}
                            error={error}
                            isSimulated={isSimulated}
                        />

                        <WalletDeleteDialog
                            openDeleteConfirm={openDeleteConfirm}
                            onCloseDeleteConfirm={handleCloseDeleteConfirm}
                            onConfirmDelete={handleConfirmDeleteAndCloseDialog}
                            loading={loading}
                        />
                    </Box>
                </ProgressiveLoad>
            </SuspenseWrapper>
        </ErrorBoundary>

    );
};