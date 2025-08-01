import { Box, Typography } from '@mui/material';
import { WalletItem } from '../WalletItem';
import { AddWalletDialog } from '../AddWalletDialog';
import { EditWalletDialog } from '../EditWalletDialog';
import { DeleteWalletConfirmDialog } from '../DeleteWalletConfirmDialog';
import { Wallet } from '@/services/api/types';

interface WalletContentProps {
    wallets: Wallet[];
    expanded: string | false;
    onAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onEdit: (wallet: Wallet) => void;
    onDelete: (walletId: string) => void;
    openAddDialog: boolean;
    onCloseAddDialog: () => void;
    onCreateWallet: (name: string, description: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    openEditDialog: boolean;
    onCloseEditDialog: () => void;
    onUpdateWallet: (walletId: string, name: string, description: string) => Promise<void>;
    editingWallet: Wallet | null;
    openDeleteConfirm: boolean;
    onCloseDeleteConfirm: () => void;
    onConfirmDelete: () => Promise<void>;
}

export const WalletContent: React.FC<WalletContentProps> = ({
    wallets,
    expanded,
    onAccordionChange,
    onEdit,
    onDelete,
    openAddDialog,
    onCloseAddDialog,
    onCreateWallet,
    loading,
    error,
    openEditDialog,
    onCloseEditDialog,
    onUpdateWallet,
    editingWallet,
    openDeleteConfirm,
    onCloseDeleteConfirm,
    onConfirmDelete,
}) => {
    return (
        <Box>
            <AddWalletDialog
                open={openAddDialog}
                onClose={onCloseAddDialog}
                onCreate={onCreateWallet}
                loading={loading}
                error={error}
            />
            <EditWalletDialog
                open={openEditDialog}
                onClose={onCloseEditDialog}
                onUpdate={onUpdateWallet}
                loading={loading}
                error={error}
                editingWallet={editingWallet}
            />
            <DeleteWalletConfirmDialog
                open={openDeleteConfirm}
                onClose={onCloseDeleteConfirm}
                onConfirm={onConfirmDelete}
                loading={loading}
            />
            {wallets.length === 0 ? (
                <Typography>Nenhuma carteira encontrada.</Typography>
            ) : (
                wallets.map((wallet) => (
                    <WalletItem
                        key={wallet._id}
                        wallet={wallet}
                        expanded={expanded === wallet._id}
                        onAccordionChange={onAccordionChange}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            )}
        </Box>
    );
};