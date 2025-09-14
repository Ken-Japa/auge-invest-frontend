import React from 'react';
import { Typography } from '@mui/material';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, CancelButton, DeleteButton } from './styled';
import { useRecentActivitiesRefresh } from '@/pagesComponents/Logado/Carteira/context/RecentActivitiesContext';

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
    const { triggerRefresh } = useRecentActivitiesRefresh();

    const handleDeleteConfirm = () => {
        onConfirm();
        triggerRefresh();
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogTitle>Confirmar Exclusão</StyledDialogTitle>
            <StyledDialogContent sx={{ textAlign: 'center' }}>
                <Typography>Tem certeza de que deseja excluir esta carteira? <br /></Typography>
                <Typography><br />Esta ação não poderá ser desfeita.</Typography>
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onClose} color="primary" disabled={loading}>
                    Cancelar
                </CancelButton>
                <DeleteButton onClick={handleDeleteConfirm} color="error" disabled={loading}>
                    {loading ? 'Excluindo...' : 'Excluir'}
                </DeleteButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};