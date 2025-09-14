import { useState, useEffect, useCallback } from "react";
import { Alert } from "@/services/api/types";
import { alertsService } from "../services/alertsService";
import { useSession } from "next-auth/react";

export const useAlerts = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await alertsService.getAlerts(userId);
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError("Falha ao buscar alertas");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createAlert = async (alertData: Omit<Alert, "id">) => {
    if (!userId) return;
    try {
      console.log(userId);
      const newAlert = await alertsService.createAlert({
        ...alertData,
        userId,
      });
      setAlerts((prev) => [...prev, newAlert]);
      return newAlert;
    } catch (err) {
      setError("Falha ao criar alerta");
      throw err;
    }
  };

  const updateAlert = async (id: string, alertData: Partial<Alert>) => {
    try {
      const updatedAlert = await alertsService.updateAlert(id, alertData);
      setAlerts((prev) => prev.map((a) => (a.id === id ? updatedAlert : a)));
      return updatedAlert;
    } catch (err) {
      setError("Falha ao atualizar alerta");
      throw err;
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      await alertsService.deleteAlert(id);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError("Falha ao deletar alerta");
      throw err;
    }
  };

  const toggleAlert = async (id: string, active: boolean) => {
    try {
      await alertsService.toggleAlert(id, active);
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, triggered: active } : a))
      );
    } catch (err) {
      setError("Falha ao vizualizar alerta");
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAlerts();
    }
  }, [fetchAlerts, userId]);

  return {
    alerts,
    loading,
    error,
    createAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    refreshAlerts: fetchAlerts,
  };
};
