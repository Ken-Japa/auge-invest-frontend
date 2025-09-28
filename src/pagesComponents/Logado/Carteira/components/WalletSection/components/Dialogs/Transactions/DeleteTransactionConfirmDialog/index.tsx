import { CircularProgress, DialogContentText, Typography } from '@mui/material';
import React from 'react';

import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext';
import { api } from '@/services/api';

import { CancelButton, DeleteButton,StyledDialog, StyledDialogActions, StyledDialogContent, StyledDialogTitle } from './styled';

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
    const { triggerRefresh } = useRecentActivitiesRefresh();

    const handleDelete = async () => {
        if (!transactionId) return;

        setLoading(true);
        setError(null);
        try {
            await api.wallet.deleteTransaction(transactionId);
            onConfirm();
            onClose();
            triggerRefresh();
        } catch (err: any) {
            setError(err.message || 'Failed to delete transaction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogTitle>Confirmar Exclusão</StyledDialogTitle>
            <StyledDialogContent sx={{ textAlign: 'center' }}>
                <DialogContentText>
                    <Typography component="span">Tem certeza que deseja excluir esta operação? <br /></Typography>
                    <Typography component="span"><br />Esta ação não poderá ser desfeita.</Typography>
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