import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress, Typography } from '@mui/material';
import { api } from '@/services/api';

interface DeleteTransactionConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    transactionId: string | null;
    onConfirm: () => void;
}

export const DeleteTransactionConfirmDialog: React.FC<DeleteTransactionConfirmDialogProps> = ({
    open,
    onClose,
    transactionId,
    onConfirm,
}) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleDelete = async () => {
        if (!transactionId) return;

        setLoading(true);
        setError(null);
        try {
            await api.wallet.deleteTransaction(transactionId);
            onConfirm();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to delete transaction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tem certeza que deseja excluir esta operação? Esta ação não poderá ser desfeita.
                </DialogContentText>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={loading}>
                    Cancelar
                </Button>
                <Button onClick={handleDelete} color="error" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Excluir'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};