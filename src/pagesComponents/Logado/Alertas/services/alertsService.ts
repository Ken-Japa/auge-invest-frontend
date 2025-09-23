import { alertsApi } from "@/services/api/endpoints/alerts";
import { Alert } from "@/services/api/types";

export const alertsService = {
  getAlerts: async (userId: string): Promise<Alert[]> => {
    const response = await alertsApi.getAlertsByUser(userId);
    return response.content as Alert[];
  },

  createAlert: async (alert: Omit<Alert, "id">): Promise<Alert> => {
    const response = await alertsApi.createAlert(alert as Alert);
    return response as Alert;
  },

  updateAlert: async (id: string, alert: Partial<Alert>): Promise<Alert> => {
    const response = await alertsApi.updateAlert(id, alert);
    return response as Alert;
  },

  deleteAlert: async (id: string): Promise<void> => {
    await alertsApi.deleteAlert(id);
  },

  toggleAlert: async (id: string, active: boolean): Promise<void> => {
    await alertsApi.updateAlert(id, { triggered: active });
  },
};