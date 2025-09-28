import { useCallback, useEffect, useMemo,useState } from "react";

import { useApi } from "@/providers/ApiProvider";
import { api } from "@/services/api";

export const useUserAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { revalidateAlerts } = useApi();

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.alerts.getAlertsByUser();
      const sortedAlerts = response.result.sort((a: any, b: any) => {
        // Prioritize triggered alerts first
        if (a.triggered && !b.triggered) return -1;
        if (!a.triggered && b.triggered) return 1;

        // Then sort by creation date (most recent first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setAlerts(sortedAlerts);
    } catch (err) {
      setError("Failed to fetch alerts.");
      console.error("Failed to fetch alerts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts, revalidateAlerts]);

  const markAlertAsRead = useCallback(async (alertId: string) => {
    try {
      await api.alerts.updateAlert(alertId, { triggered: false });
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert._id === alertId ? { ...alert, triggered: false } : alert
        )
      );
      revalidateAlerts(); // Call revalidateAlerts after marking an alert as read
    } catch (err) {
      console.error("Failed to mark alert as read:", err);
    }
  }, [revalidateAlerts]);

  const triggeredAlertCount = useMemo(() => {
    return alerts.filter((alert) => alert.triggered).length;
  }, [alerts]);

  return {
    alerts,
    loading,
    error,
    markAlertAsRead,
    triggeredAlertCount,
    fetchAlerts,
  };
};
