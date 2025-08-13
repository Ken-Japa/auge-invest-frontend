import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface AddWalletDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string, description: string, simulated: boolean) => void;
    loading: boolean;
    error: string | null;
    isSimulated?: boolean;
}

export const AddWalletDialog: React.FC<AddWalletDialogProps> = ({
    open,
    onClose,
    onCreate,
    loading,
    error,
    isSimulated = false,
}) => {
    const [newWalletName, setNewWalletName] = useState<string>('');
    const [newWalletDescription, setNewWalletDescription] = useState<string>('');

    const handleCreate = () => {
        onCreate(newWalletName, newWalletDescription, isSimulated);
        setNewWalletName('');
        setNewWalletDescription('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isSimulated ? 'Criar Nova Simulação' : 'Criar Nova Carteira'}</DialogTitle>
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
                <TextField
                    margin="dense"
                    label="Tipo"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={isSimulated ? 'Simulada' : 'Real'}
                    InputProps={{
                        readOnly: true,
                    }}
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