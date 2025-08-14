import React, { useState, useEffect, useRef } from 'react';
import { TextField, Switch, FormControlLabel } from '@mui/material';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, CancelButton, CreateButton } from './styled';

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
        <StyledDialog open={open} onClose={handleCloseDialog}>
            <StyledDialogTitle>{isSimulated ? 'Criar Nova Simulação' : 'Criar Nova Carteira'}</StyledDialogTitle>
            <StyledDialogContent>

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
                    sx={{ alignSelf: 'flex-end', mt: 2 }}
                />

            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={handleCloseDialog} color="primary">
                    Cancelar
                </CancelButton>
                <CreateButton onClick={handleCreate} disabled={loading}>
                    {loading ? 'Criando...' : 'Criar'}
                </CreateButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};