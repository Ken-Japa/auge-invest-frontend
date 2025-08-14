import { useState, useCallback } from "react";
import { api } from "@/services/api";
import { WalletTransactions } from "@/services/api/types/transaction";

export const useWalletPositions = () => {
  const [walletPositions, setWalletPositions] = useState<WalletTransactions | null>(null);
  const [loadingPositions, setLoadingPositions] = useState<boolean>(false);
  const [errorPositions, setErrorPositions] = useState<string | null>(null);

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
    walletPositions,
    loadingPositions,
    errorPositions,
    fetchWalletPositions,
  };
};