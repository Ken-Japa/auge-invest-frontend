import React from 'react';
import { DialogContentText, Button, CircularProgress, Typography } from '@mui/material';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, CancelButton, DeleteButton } from './styled';
import { api } from '@/services/api';

interface DeleteTransactionConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    transactionId: string | null;
    positionId: string | null;
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
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogTitle>Confirmar Exclusão</StyledDialogTitle>
            <StyledDialogContent>
                <DialogContentText>
                    <Typography component="span">Tem certeza que deseja excluir esta operação?</Typography>
                    <Typography component="span">Esta ação não poderá ser desfeita.</Typography>
                </DialogContentText>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onClose} disabled={loading}>
                    Cancelar
                </CancelButton>
                <DeleteButton onClick={handleDelete} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Excluir'}
                </DeleteButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};