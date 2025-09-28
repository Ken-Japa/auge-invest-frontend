import { useCallback,useEffect, useState } from 'react';

import { Wallet } from '@/services/api/types';

import { useWalletData } from './useWalletData';

interface UseWalletSectionLogicProps {
    isSimulated?: boolean;
}

export const useWalletSectionLogic = ({ isSimulated }: UseWalletSectionLogicProps) => {
    const { wallets, loading, error, fetchWallets, handleCreateWallet, handleUpdateWallet, handleConfirmDelete, walletPositions, loadingPositions, errorPositions, fetchWalletPositions } = useWalletData(isSimulated);

    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
    const [walletToDelete, setWalletToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchWallets();
    }, [fetchWallets]);

    const handleOpenAddDialog = useCallback(() => {
        setOpenAddDialog(true);
    }, []);

    const handleCloseAddDialog = useCallback(() => {
        setOpenAddDialog(false);
    }, []);

    const handleCreateWalletAndCloseDialog = useCallback(async (name: string, description: string, simulated: boolean) => {
        await handleCreateWallet(name, description, simulated);
        handleCloseAddDialog();
    }, [handleCreateWallet, handleCloseAddDialog]);

    const handleAccordionChange = useCallback((panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }, []);

    const collapseAccordion = useCallback(() => {
        setExpanded(false);
    }, []);

    const handleEditWallet = useCallback((wallet: Wallet) => {
        setEditingWallet(wallet);
        setOpenEditDialog(true);
    }, []);

    const handleUpdateWalletAndCloseDialog = useCallback(async (walletId: string, name: string, description: string, simulated: boolean) => {
        await handleUpdateWallet(walletId, name, description, simulated);
        setOpenEditDialog(false);
        setEditingWallet(null);
    }, [handleUpdateWallet]);

    const handleDeleteWallet = useCallback((walletId: string) => {
        setWalletToDelete(walletId);
        setOpenDeleteConfirm(true);
    }, []);

    const handleConfirmDeleteAndCloseDialog = useCallback(async () => {
        await handleConfirmDelete(walletToDelete as string);
        setOpenDeleteConfirm(false);
        setWalletToDelete(null);
    }, [handleConfirmDelete, walletToDelete]);

    const handleCloseEditDialog = useCallback(() => {
        setOpenEditDialog(false);
        setEditingWallet(null);
    }, []);

    const handleCloseDeleteConfirm = useCallback(() => {
        setOpenDeleteConfirm(false);
        setWalletToDelete(null);
    }, []);

    return {
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
    };
};