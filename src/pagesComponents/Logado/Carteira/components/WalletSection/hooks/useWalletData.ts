import { useWallets } from "./useWallets";
import { useWalletPositions } from "./useWalletPositions";

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
