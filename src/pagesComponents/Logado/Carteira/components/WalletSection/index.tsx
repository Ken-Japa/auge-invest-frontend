import { Typography, Button, CircularProgress } from '@mui/material';
import { WalletSectionContainer, WalletSectionHeader, LoadingContainer, NoWalletsMessage } from './styled';
import { Add as AddIcon } from '@mui/icons-material';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';

import { WalletContent } from './components/WalletContent';
import { WalletDialogs } from './components/Dialogs/Wallet/WalletDialogs';
import { WalletDeleteDialog } from './components/Dialogs/Wallet/WalletDeleteDialog';
import { useWalletSectionLogic } from './hooks/useWalletSectionLogic';


interface WalletSectionProps {
    title: string;
    isSimulated?: boolean;
}

export const WalletSection: React.FC<WalletSectionProps> = ({ title, isSimulated }) => {
    const {
        wallets,
        loading,
        error,
        walletPositions,
        loadingPositions,
        errorPositions,
        fetchWalletPositions,
        openAddDialog,
        expanded,
        openEditDialog,
        editingWallet,
        openDeleteConfirm,
        handleOpenAddDialog,
        handleCloseAddDialog,
        handleCreateWalletAndCloseDialog,
        handleAccordionChange,
        handleEditWallet,
        handleUpdateWalletAndCloseDialog,
        handleDeleteWallet,
        handleConfirmDeleteAndCloseDialog,
        handleCloseEditDialog,
        handleCloseDeleteConfirm,
    } = useWalletSectionLogic({ isSimulated });

    return (
        <ErrorBoundary>
            <SuspenseWrapper>
                <ProgressiveLoad delay={0.2}>
                    <WalletSectionContainer>

                        <WalletSectionHeader>
                            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', my: 4 }}>
                                {title}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleOpenAddDialog}
                            >
                                {isSimulated ? 'Nova Simulação' : 'Nova Carteira'}
                            </Button>
                        </WalletSectionHeader>
                        {loading && (
                            <LoadingContainer>
                                <CircularProgress />
                            </LoadingContainer>
                        )}
                        {wallets.length === 0 && !loading && !error ? (
                            <NoWalletsMessage>
                                <Typography variant="body1" color="textSecondary">
                                    Nenhuma carteira encontrada. Crie uma nova para começar!
                                </Typography>
                            </NoWalletsMessage>
                        ) : (
                            <WalletContent
                                wallets={wallets}
                                expanded={expanded}
                                onAccordionChange={handleAccordionChange}
                                onEdit={handleEditWallet}
                                onDelete={handleDeleteWallet}
                                isSimulated={isSimulated}
                                loading={loading}
                                error={error}

                                walletPositions={walletPositions}
                                loadingPositions={loadingPositions}
                                errorPositions={errorPositions}
                                fetchWalletPositions={fetchWalletPositions}
                            />
                        )}

                        <WalletDialogs
                            openAddDialog={openAddDialog}
                            onCloseAddDialog={handleCloseAddDialog}
                            onCreateWallet={handleCreateWalletAndCloseDialog}
                            openEditDialog={openEditDialog}
                            onCloseEditDialog={handleCloseEditDialog}
                            onUpdateWallet={handleUpdateWalletAndCloseDialog}
                            editingWallet={editingWallet}
                            loading={loading}
                            error={error}
                            isSimulated={isSimulated}
                        />

                        <WalletDeleteDialog
                            openDeleteConfirm={openDeleteConfirm}
                            onCloseDeleteConfirm={handleCloseDeleteConfirm}
                            onConfirmDelete={handleConfirmDeleteAndCloseDialog}
                            loading={loading}
                        />
                    </WalletSectionContainer>
                </ProgressiveLoad>
            </SuspenseWrapper>
        </ErrorBoundary>

    );
};