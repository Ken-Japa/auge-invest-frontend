import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteWalletConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const DeleteWalletConfirmDialog: React.FC<DeleteWalletConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    loading,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <Typography>Tem certeza de que deseja excluir esta carteira? </Typography>
                <Typography>Esta ação não pode ser desfeita.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={loading}>
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="error" disabled={loading}>
                    {loading ? 'Excluindo...' : 'Excluir'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};