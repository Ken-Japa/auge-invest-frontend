import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { AddWalletDialog } from './components/AddWalletDialog';
import { EditWalletDialog } from './components/EditWalletDialog';
import { DeleteWalletConfirmDialog } from './components/DeleteWalletConfirmDialog';
import {
    Add as AddIcon,
} from '@mui/icons-material';

import { useSession } from 'next-auth/react';
import { api } from '@/services/api';
import { Wallet } from '@/services/api/types';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { WalletItem } from './components/WalletItem';

interface WalletSectionProps {
    title: string;
}

export const WalletSection: React.FC<WalletSectionProps> = ({ title }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
    const [walletToDelete, setWalletToDelete] = useState<string | null>(null);

    const fetchWallets = async () => {
        if (!userId) {
            setError('User not authenticated.');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const userWallets = await api.wallet.getUserWallets(userId);
            setWallets(userWallets);
        } catch (err: any) {
            if (err.code === 'wallet/not-found' && err.message === 'Carteira não encontrada. Por favor, verifique as informações fornecidas.') {
                setWallets([]);
                setError(null);
            } else {
                setError(err.message || 'Failed to fetch wallets.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallets();
    }, [userId]);

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleCreateWallet = async (name: string, description: string) => {
        if (!userId || !name) {
            setError('Wallet name and user ID are required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await api.wallet.createWallet({
                name: name,
                description: description,
                userId: userId,
            });
            handleCloseAddDialog();
            fetchWallets(); // Refresh the list of wallets
        } catch (err: any) {
            setError(err.message || 'Failed to create wallet.');
        } finally {
            setLoading(false);
        }
    };

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEditWallet = (wallet: Wallet) => {
        setEditingWallet(wallet);
        setOpenEditDialog(true);
    };

    const handleUpdateWallet = async (walletId: string, name: string, description: string) => {
        if (!walletId || !name) {
            setError('Wallet name and wallet ID are required for update.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await api.wallet.updateWallet(walletId, {
                name: name,
                description: description,
            });
            setOpenEditDialog(false);
            setEditingWallet(null);
            fetchWallets();
        } catch (err: any) {
            setError(err.message || 'Failed to update wallet.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWallet = (walletId: string) => {
        setWalletToDelete(walletId);
        setOpenDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!walletToDelete) return;
        setLoading(true);
        setError(null);
        try {
            await api.wallet.deleteWallet(walletToDelete);
            setOpenDeleteConfirm(false);
            setWalletToDelete(null);
            fetchWallets();
        } catch (err: any) {
            setError(err.message || 'Failed to delete wallet.');
        } finally {
            setLoading(false);
        }
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
                                <AddWalletDialog
                                    open={openAddDialog}
                                    onClose={handleCloseAddDialog}
                                    onCreate={handleCreateWallet}
                                    loading={loading}
                                    error={error}
                                />
                                <EditWalletDialog
                                    open={openEditDialog}
                                    onClose={handleCloseEditDialog}
                                    onUpdate={handleUpdateWallet}
                                    loading={loading}
                                    error={error}
                                    editingWallet={editingWallet}
                                />
                                <DeleteWalletConfirmDialog
                                    open={openDeleteConfirm}
                                    onClose={handleCloseDeleteConfirm}
                                    onConfirm={handleConfirmDelete}
                                    loading={loading}
                                />
                                {wallets.map((wallet) => (
                                    <WalletItem
                                        key={wallet._id}
                                        wallet={wallet}
                                        expanded={expanded === wallet._id}
                                        onAccordionChange={handleAccordionChange}
                                        onEdit={handleEditWallet}
                                        onDelete={handleDeleteWallet}
                                    />
                                ))}
                            </Box>
                        )}

                    </Box>
                </ProgressiveLoad>
            </SuspenseWrapper>
        </ErrorBoundary >
    );
};