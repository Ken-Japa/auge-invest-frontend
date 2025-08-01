import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import {
    Add as AddIcon,
    Edit,
    Delete
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
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [newWalletName, setNewWalletName] = useState<string>('');
    const [newWalletDescription, setNewWalletDescription] = useState<string>('');
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
            // Check if the error is due to no portfolios found
            if (err.code === 'wallet/not-found' && err.message === 'Carteira não encontrada. Por favor, verifique as informações fornecidas.') {
                setWallets([]); // Treat as empty list, not an error
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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewWalletName('');
        setNewWalletDescription('');
    };

    const handleCreateWallet = async () => {
        if (!userId || !newWalletName) {
            setError('Wallet name and user ID are required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await api.wallet.createWallet({
                name: newWalletName,
                description: newWalletDescription,
                userId: userId,
            });
            handleCloseDialog();
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
        setNewWalletName(wallet.name);
        setNewWalletDescription(wallet.description || '');
        setOpenEditDialog(true);
    };

    const handleUpdateWallet = async () => {
        if (!editingWallet || !newWalletName) {
            setError('Wallet name and wallet ID are required for update.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await api.wallet.updateWallet(editingWallet._id, {
                name: newWalletName,
                description: newWalletDescription,
            });
            setOpenEditDialog(false);
            setEditingWallet(null);
            setNewWalletName('');
            setNewWalletDescription('');
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
        setNewWalletName('');
        setNewWalletDescription('');
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
                            onClick={handleOpenDialog}
                            sx={{ mb: 2 }}
                        >
                            Nova Carteira
                        </Button>
                        {wallets.length === 0 ? (
                            <Typography>Nenhuma carteira encontrada.</Typography>
                        ) : (
                            <Box>
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

                        <Dialog open={openDialog} onClose={handleCloseDialog}>
                            <DialogTitle>Criar Nova Carteira</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Nome da Carteira"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={newWalletName}
                                    onChange={(e) => setNewWalletName(e.target.value)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Descrição (Opcional)"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={newWalletDescription}
                                    onChange={(e) => setNewWalletDescription(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Cancelar</Button>
                                <Button onClick={handleCreateWallet}>Criar</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                            <DialogTitle>Editar Carteira</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Nome da Carteira"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={newWalletName}
                                    onChange={(e) => setNewWalletName(e.target.value)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Descrição (Opcional)"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={newWalletDescription}
                                    onChange={(e) => setNewWalletDescription(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEditDialog}>Cancelar</Button>
                                <Button onClick={handleUpdateWallet}>Salvar</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
                            <DialogTitle>Confirmar Exclusão</DialogTitle>
                            <DialogContent>
                                <Typography>Tem certeza de que deseja excluir esta carteira? Esta ação não pode ser desfeita.</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDeleteConfirm}>Cancelar</Button>
                                <Button onClick={handleConfirmDelete} color="error">Excluir</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </ProgressiveLoad>
            </SuspenseWrapper>
        </ErrorBoundary >
    );
};