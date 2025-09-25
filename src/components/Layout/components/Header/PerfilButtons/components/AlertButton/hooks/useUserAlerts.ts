import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "@/services/api";
import { useApi } from "@/providers/ApiProvider";

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
        if (a.triggered === b.triggered) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return a.triggered ? 1 : -1;
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
      await api.alerts.updateAlert(alertId, { triggered: true });
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert._id === alertId ? { ...alert, triggered: true } : alert
        )
      );
    } catch (err) {
      console.error("Failed to mark alert as read:", err);
    }
  }, []);

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
