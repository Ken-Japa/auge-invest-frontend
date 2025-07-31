import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { api } from '@/services/api';
import { Wallet } from '@/services/api/types';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';

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
                        <Typography variant="h4" gutterBottom>{title}</Typography>
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
                                    <Box key={wallet._id} sx={{ border: '1px solid #ccc', p: 2, mb: 2, borderRadius: '8px' }}>
                                        <Typography variant="h6">{wallet.name}</Typography>
                                        <Typography variant="body2">{wallet.description}</Typography>
                                    </Box>
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
                    </Box>
                </ProgressiveLoad>
            </SuspenseWrapper>
        </ErrorBoundary>
    );
};