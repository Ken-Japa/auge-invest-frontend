import { useWalletPositions } from "./useWalletPositions";
import { useWallets } from "./useWallets";

export const useWalletData = (isSimulated?: boolean) => {
  const {
    wallets,
    loading,
    error,
    fetchWallets,
    handleCreateWallet,
    handleUpdateWallet,
    handleConfirmDelete,
  } = useWallets(isSimulated);
  const {
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
  } = useWalletPositions();

  return {
    wallets,
    loading,
    error,
    fetchWallets,
    handleCreateWallet,
    handleUpdateWallet,
    handleConfirmDelete,
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
  };
};
