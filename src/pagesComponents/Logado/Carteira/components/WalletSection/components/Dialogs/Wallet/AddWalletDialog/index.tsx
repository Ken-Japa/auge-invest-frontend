import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Switch, FormControlLabel } from '@mui/material';

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
    isSimulated = false,
}) => {
    const [newWalletName, setNewWalletName] = useState<string>('');
    const [newWalletDescription, setNewWalletDescription] = useState<string>('');
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [simulatedState, setSimulatedState] = useState<boolean>(isSimulated);

    useEffect(() => {
        setSimulatedState(isSimulated);
    }, [isSimulated]);

    const handleCreate = () => {
        onCreate(newWalletName, newWalletDescription, simulatedState);
        setNewWalletName('');
        setNewWalletDescription('');
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
            <DialogTitle>{isSimulated ? 'Criar Nova Simulação' : 'Criar Nova Carteira'}</DialogTitle>
            <DialogContent>

                <TextField
                    inputRef={nameInputRef}
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
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newWalletDescription}
                    onChange={(e) => setNewWalletDescription(e.target.value)}
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
                <Button onClick={handleCreate} color="primary" disabled={loading || !newWalletName}>
                    {loading ? 'Criando...' : 'Criar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};