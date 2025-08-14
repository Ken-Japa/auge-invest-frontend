import { Box, Typography } from '@mui/material';

import { Wallet } from '@/services/api/types';
import { WalletTransactions } from '@/services/api/types/transaction';

import { WalletItem } from '../WalletItem';

interface WalletContentProps {
    wallets: Wallet[];
    expanded: string | false;
    onAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onEdit: (wallet: Wallet) => void;
    onDelete: (walletId: string) => void;
    isSimulated?: boolean;
    loading: boolean;
    error: string | null;
    walletPositions: WalletTransactions | null;
    loadingPositions: boolean;
    errorPositions: string | null;
    fetchWalletPositions: (walletId: string) => Promise<void>;
}

export const WalletContent: React.FC<WalletContentProps> = ({
    wallets,
    expanded,
    onAccordionChange,
    onEdit,
    onDelete,
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
}) => {
    return (
        <Box>
            {wallets.map((wallet) => (
                <WalletItem
                    key={wallet._id}
                    wallet={wallet}
                    expanded={expanded === wallet._id}
                    onAccordionChange={onAccordionChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    walletPositions={walletPositions}
                    loadingPositions={loadingPositions}
                    errorPositions={errorPositions}
                    fetchWalletPositions={fetchWalletPositions}
                />
            ))}
        </Box>
    );
};