import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Switch, FormControlLabel } from '@mui/material';
import { Wallet } from '@/services/api/types';


interface EditWalletDialogProps {
    open: boolean;
    onClose: () => void;
    onUpdate: (walletId: string, name: string, description: string, simulated: boolean) => void;
    loading: boolean;
    error: string | null;
    editingWallet: Wallet | null;
}

export const EditWalletDialog: React.FC<EditWalletDialogProps> = ({
    open,
    onClose,
    onUpdate,
    loading,
    editingWallet,
}) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [simulatedState, setSimulatedState] = useState<boolean>(false);

    useEffect(() => {
        if (editingWallet) {
            setName(editingWallet.name);
            setDescription(editingWallet.description || '');
            setSimulatedState(editingWallet.simulated);
        }
    }, [editingWallet]);

    const handleUpdate = () => {
        if (editingWallet) {
            onUpdate(editingWallet._id, name, description, simulatedState);
        }
    };

    const handleCloseDialog = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        onClose();
    };

    const handleSimulatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSimulatedState(event.target.checked);
    };

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>Editar Carteira</DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={nameInputRef}
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
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={simulatedState}
                            onChange={handleSimulatedChange}
                            name="simulated"
                            color="primary"
                        />
                    }
                    label={simulatedState ? 'Carteira Simulada' : 'Carteira Real'}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleUpdate} color="primary" disabled={loading || !name}>
                    {loading ? 'Atualizando...' : 'Atualizar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};