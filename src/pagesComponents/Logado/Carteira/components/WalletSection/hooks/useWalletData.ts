import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/services/api";
import { Wallet, WalletTransactions } from "@/services/api/types";

export const useWalletData = (isSimulated?: boolean) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [walletPositions, setWalletPositions] =
    useState<WalletTransactions | null>(null);
  const [loadingPositions, setLoadingPositions] = useState<boolean>(false);
  const [errorPositions, setErrorPositions] = useState<string | null>(null);

  const fetchWallets = useCallback(async () => {
    if (!userId) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userWallets = await api.wallet.getUserWallets(userId);
      const filteredWallets = userWallets.filter(wallet => wallet.simulated === isSimulated);
      setWallets(filteredWallets);
      console.log(userId);
    } catch (err: any) {
      if (
        err.code === "wallet/not-found" &&
        err.message ===
          "Carteira não encontrada. Por favor, verifique as informações fornecidas."
      ) {
        setWallets([]);
        setError(null);
      } else {
        setError(err.message || "Failed to fetch wallets.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWallets();
  }, [userId, fetchWallets]);

  const handleCreateWallet = useCallback(
    async (name: string, description: string) => {
      if (!userId || !name) {
        setError("Wallet name and user ID are required.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await api.wallet.createWallet({
          name: name,
          description: description,
          userId: userId,
        });
        fetchWallets(); // Refresh the list of wallets
      } catch (err: any) {
        setError(err.message || "Failed to create wallet.");
      } finally {
        setLoading(false);
      }
    },
    [userId, fetchWallets]
  );

  const handleUpdateWallet = useCallback(
    async (walletId: string, name: string, description: string) => {
      if (!walletId || !name) {
        setError("Wallet name and wallet ID are required for update.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await api.wallet.updateWallet(walletId, {
          name: name,
          description: description,
        });
        fetchWallets();
      } catch (err: any) {
        setError(err.message || "Failed to update wallet.");
      } finally {
        setLoading(false);
      }
    },
    [fetchWallets]
  );

  const handleConfirmDelete = useCallback(
    async (walletToDelete: string) => {
      if (!walletToDelete) return;
      setLoading(true);
      setError(null);
      try {
        await api.wallet.deleteWallet(walletToDelete);
        fetchWallets();
      } catch (err: any) {
        setError(err.message || "Failed to delete wallet.");
      } finally {
        setLoading(false);
      }
    },
    [fetchWallets]
  );

  const fetchWalletPositions = useCallback(async (walletId: string) => {
    setLoadingPositions(true);
    setErrorPositions(null);
    console.log(walletId);
    try {
      const response = await api.wallet.getWalletPosition(walletId);
      setWalletPositions(response);
    } catch (err: any) {
      setErrorPositions(err.message || "Failed to fetch wallet positions.");
    } finally {
      setLoadingPositions(false);
    }
  }, []);

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
