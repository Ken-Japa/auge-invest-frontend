import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/services/api";
import { Wallet } from "@/services/api/types/wallet";
import { Transaction, Positions } from "@/services/api/types/transaction";

interface RecentActivity {
  assetCode: string;
  type: string;
  quantity: number;
  price: number;
  executedAt: string;
}

export function useSearchRecentActivities() {
  const { data: session } = useSession();
  const [recentRealActivities, setRecentRealActivities] = useState<
    RecentActivity[]
  >([]);
  const [recentVirtualActivities, setRecentVirtualActivities] = useState<
    RecentActivity[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        setError("User not authenticated");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const userId = session.user.id;
        const allWallets: Wallet[] = await api.wallet.getUserWallets(userId);

        const realWallets = allWallets.filter((wallet) => !wallet.simulated);
        const virtualWallets = allWallets.filter((wallet) => wallet.simulated);

        const fetchTransactionsForWallets = async (wallets: Wallet[]) => {
          let allTransactions: RecentActivity[] = [];
          for (const wallet of wallets) {
            const positionsResponse = await api.wallet.getWalletPosition(
              wallet._id
            );
            const positions: Positions[] = positionsResponse.result;

            for (const position of positions) {
              const transactionsResponse =
                await api.wallet.getTransactionsByPositionId(position._id);
              const transactions: Transaction[] = transactionsResponse.result;

              const mappedTransactions: RecentActivity[] = transactions.map(
                (tx) => ({
                  assetCode: position.assetCode,
                  type: tx.type,
                  quantity: tx.quantity,
                  price: tx.price,
                  executedAt: tx.executedAt,
                })
              );
              allTransactions.push(...mappedTransactions);
            }
          }
          return allTransactions;
        };

        const realActivities = await fetchTransactionsForWallets(realWallets);
        const virtualActivities = await fetchTransactionsForWallets(
          virtualWallets
        );

        const sortedRealActivities = realActivities
          .sort(
            (a, b) =>
              new Date(b.executedAt).getTime() -
              new Date(a.executedAt).getTime()
          )
          .slice(0, 4);
        setRecentRealActivities(sortedRealActivities);

        const sortedVirtualActivities = virtualActivities
          .sort(
            (a, b) =>
              new Date(b.executedAt).getTime() -
              new Date(a.executedAt).getTime()
          )
          .slice(0, 4);
        setRecentVirtualActivities(sortedVirtualActivities);
      } catch (err) {
        console.error("Error fetching recent activities:", err);
        setError("Failed to fetch recent activities.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();
  }, [session]);

  return {
    recentRealActivities,
    recentVirtualActivities,
    loading,
    error,
  };
}
