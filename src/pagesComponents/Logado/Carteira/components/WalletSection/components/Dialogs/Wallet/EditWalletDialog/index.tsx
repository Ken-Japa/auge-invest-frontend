import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Wallet } from '@/services/api/types';

interface EditWalletDialogProps {
    open: boolean;
    onClose: () => void;
    onUpdate: (walletId: string, name: string, description: string) => void;
    loading: boolean;
    error: string | null;
    editingWallet: Wallet | null;
}

export const EditWalletDialog: React.FC<EditWalletDialogProps> = ({
    open,
    onClose,
    onUpdate,
    loading,
    error,
    editingWallet,
}) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (editingWallet) {
            setName(editingWallet.name);
            setDescription(editingWallet.description || '');
        }
    }, [editingWallet]);

    const handleUpdate = () => {
        if (editingWallet) {
            onUpdate(editingWallet._id, name, description);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Carteira</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome da Carteira"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Descrição (Opcional)"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleUpdate} color="primary" disabled={loading || !name}>
                    {loading ? 'Atualizando...' : 'Atualizar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};