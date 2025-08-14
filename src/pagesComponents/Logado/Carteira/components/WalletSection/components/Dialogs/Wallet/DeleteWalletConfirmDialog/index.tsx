import React from 'react';
import { Typography } from '@mui/material';
import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, CancelButton, DeleteButton } from './styled';

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
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogTitle>Confirmar Exclusão</StyledDialogTitle>
            <StyledDialogContent>
                <Typography>Tem certeza de que deseja excluir esta carteira? </Typography>
                <Typography>Esta ação não poderá ser desfeita.</Typography>
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onClose} color="primary" disabled={loading}>
                    Cancelar
                </CancelButton>
                <DeleteButton onClick={onConfirm} color="error" disabled={loading}>
                    {loading ? 'Excluindo...' : 'Excluir'}
                </DeleteButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};