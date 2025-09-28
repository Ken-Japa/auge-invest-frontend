import { 
    Button,
    CircularProgress,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField} from '@mui/material';
import { useState } from 'react';

interface PasswordDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (oldPassword: string, newPassword: string) => Promise<void>;
    loading: boolean;
}

export const PasswordDialog = ({ open, onClose, onSave, loading }: PasswordDialogProps) => {
    const [passwordError, setPasswordError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        
        const formData = new FormData(e.target as HTMLFormElement);
        const oldPassword = formData.get('oldPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        
        if (newPassword !== confirmPassword) {
            setPasswordError("As senhas não coincidem");
            return;
        }
        
        try {
            await onSave(oldPassword, newPassword);
        } catch (error) {
            setPasswordError("Erro ao atualizar senha. Verifique a senha atual.");
        }
    };
    
    return (
        <Dialog
            open={open}
            onClose={() => {
                if (!loading) {
                    onClose();
                    setPasswordError("");
                }
            }}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogContent>
                <form id="password-form" onSubmit={handleSubmit}>
                    <TextField
                        margin="dense"
                        name="oldPassword"
                        label="Senha Atual"
                        type="password"
                        fullWidth
                        variant="outlined"
                        required
                        disabled={loading}
                    />
                    <TextField
                        margin="dense"
                        name="newPassword"
                        label="Nova Senha"
                        type="password"
                        fullWidth
                        variant="outlined"
                        required
                        disabled={loading}
                    />
                    <TextField
                        margin="dense"
                        name="confirmPassword"
                        label="Confirmar Nova Senha"
                        type="password"
                        fullWidth
                        variant="outlined"
                        required
                        error={!!passwordError}
                        helperText={passwordError}
                        disabled={loading}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancelar</Button>
                <Button 
                    type="submit" 
                    form="password-form" 
                    variant="contained" 
                    color="primary"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};