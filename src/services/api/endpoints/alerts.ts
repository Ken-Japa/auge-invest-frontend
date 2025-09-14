import api from "../client";
import { Alert } from "../types/alert";

export const alertsApi = {
  createAlert: (alert: Alert) => api.post("/alerts", alert),
  getAlertsByUser: (userId: string) => api.get(`/alerts/user/${userId}`),
  getAlertById: (id: string) => api.get(`/alerts/${id}`),
  updateAlert: (id: string, alert: Partial<Alert>) =>
    api.put(`/alerts/${id}`, alert),
  deleteAlert: (id: string) => api.delete(`/alerts/${id}`),
};
