import { alertsApi } from "@/services/api/endpoints/alerts";
import { Alert, AlertListResponseApi } from "@/services/api/types";

export const alertsService = {
  getAlerts: async (): Promise<Alert[]> => {
    try {
      const response: AlertListResponseApi = await alertsApi.getAlertsByUser();
      return response?.result || [];
    } catch (error) {
      console.error("Error fetching alerts:", error);
      return [];
    }
  },

  createAlert: async (alert: Omit<Alert, "_id" | "userId" | "createdAt" | "updatedAt" | "__v">): Promise<Alert> => {
    const response = await alertsApi.createAlert(alert as Alert);
    return response as Alert;
  },

  updateAlert: async (id: string, alert: Partial<Alert>): Promise<Alert> => {
    const { userId, ...alertWithoutUserId } = alert;
    const response = await alertsApi.updateAlert(id, alertWithoutUserId);
    return response as Alert;
  },

  deleteAlert: async (id: string): Promise<void> => {
    await alertsApi.deleteAlert(id);
  },

  toggleAlert: async (id: string, key: 'recurring' | 'triggered', value: boolean): Promise<void> => {
    await alertsApi.updateAlert(id, { [key]: value });
  },
};
