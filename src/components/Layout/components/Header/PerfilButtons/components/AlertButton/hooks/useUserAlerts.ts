import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { alertsApi } from '@/services/api/endpoints/alerts';
import { Alert } from '@/services/api/types/alert-types';

export const useUserAlerts = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await alertsApi.getAlertsByUser();
      // Sort alerts: triggered first, then by createdAt (newest first)
      const sortedAlerts = response.result.sort((a, b) => {
        // Prioritize triggered alerts
        if (a.triggered && !b.triggered) return -1;
        if (!a.triggered && b.triggered) return 1;
        
        // If both are triggered or both are not triggered, sort by creation date
        if (a.createdAt === undefined && b.createdAt === undefined) return 0;
        if (a.createdAt === undefined) return 1; // 'a' comes after 'b' if 'a.createdAt' is undefined
        if (b.createdAt === undefined) return -1; // 'b' comes after 'a' if 'b.createdAt' is undefined
        
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first
      });
      setAlerts(sortedAlerts || []);
    } catch (err) {
      setError('Falha ao carregar alertas.');
      console.error('Falha ao carregar alertas:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const markAlertAsRead = useCallback(async (alertId: string) => {
    try {
      await alertsApi.updateAlert(alertId, { triggered: false });
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert._id === alertId ? { ...alert, triggered: false } : alert
        )
      );
    } catch (err) {
      console.error(`Erro ao marcar alerta ${alertId} como lido:`, err);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const triggeredAlertCount = useMemo(() => {
    return alerts.filter((alert) => alert.triggered).length;
  }, [alerts]);

  return { alerts, loading, error, triggeredAlertCount, fetchAlerts, markAlertAsRead };
};