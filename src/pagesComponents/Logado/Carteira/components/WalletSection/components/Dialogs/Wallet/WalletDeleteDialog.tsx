import React from 'react';
import { DeleteWalletConfirmDialog } from './DeleteWalletConfirmDialog';

interface WalletDeleteDialogProps {
  openDeleteConfirm: boolean;
  onCloseDeleteConfirm: () => void;
  onConfirmDelete: () => Promise<void>;
  loading: boolean;
}

export const WalletDeleteDialog: React.FC<WalletDeleteDialogProps> = ({
  openDeleteConfirm,
  onCloseDeleteConfirm,
  onConfirmDelete,
  loading,
}) => {
  return (
    <DeleteWalletConfirmDialog
      open={openDeleteConfirm}
      onClose={onCloseDeleteConfirm}
      onConfirm={onConfirmDelete}
      loading={loading}
    />
  );
};