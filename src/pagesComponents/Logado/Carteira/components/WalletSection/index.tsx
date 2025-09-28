import { Add as AddIcon } from '@mui/icons-material';
import { Button, CircularProgress,Typography } from '@mui/material';
import { useEffect } from 'react';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';

import { useFocus } from '../RecentActivities/components/FocusContext/FocusContext';
import { WalletDeleteDialog } from './components/Dialogs/Wallet/WalletDeleteDialog';
import { WalletDialogs } from './components/Dialogs/Wallet/WalletDialogs';
import { WalletContent } from './components/WalletContent';
import { useWalletSectionLogic } from './hooks/useWalletSectionLogic';
import { LoadingContainer, NoWalletsMessage,WalletSectionContainer, WalletSectionHeader } from './styled';


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
        collapseAccordion,
    } = useWalletSectionLogic({ isSimulated });


    const { focusedWalletId, focusedAssetCode, setFocusedItem } = useFocus();

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (focusedWalletId && wallets.length > 0) {
            const walletToFocus = wallets.find(wallet => wallet._id === focusedWalletId);
            if (walletToFocus) {
                if (expanded !== focusedWalletId) {
                    handleAccordionChange(focusedWalletId)({} as React.SyntheticEvent, true);
                }
                fetchWalletPositions(focusedWalletId);

                timer = setTimeout(() => {
                    setFocusedItem(null, null);
                }, 2000);
            }
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [focusedWalletId, wallets, expanded, handleAccordionChange, fetchWalletPositions, collapseAccordion, setFocusedItem]);

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