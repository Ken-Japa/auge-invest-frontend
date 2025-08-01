import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface AddWalletDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string, description: string) => void;
    loading: boolean;
    error: string | null;
}

export const AddWalletDialog: React.FC<AddWalletDialogProps> = ({
    open,
    onClose,
    onCreate,
    loading,
    error,
}) => {
    const [newWalletName, setNewWalletName] = useState<string>('');
    const [newWalletDescription, setNewWalletDescription] = useState<string>('');

    const handleCreate = () => {
        onCreate(newWalletName, newWalletDescription);
        setNewWalletName('');
        setNewWalletDescription('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Criar Nova Carteira</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome da Carteira"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newWalletName}
                    onChange={(e) => setNewWalletName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Descrição (Opcional)"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newWalletDescription}
                    onChange={(e) => setNewWalletDescription(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleCreate} color="primary" disabled={loading || !newWalletName}>
                    {loading ? 'Criando...' : 'Criar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};