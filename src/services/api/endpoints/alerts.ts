import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { Alert, AlertFilter, AlertListResponseApi } from "../types/alert-types";

class AlertsApiService extends BaseApiService {
  createAlert = async (alert: Alert) => {
    try {
      const { userId, ...alertWithoutUserId } = alert;
      return await this.post<Alert>(API_ENDPOINTS.ALERTS.BASE, alertWithoutUserId);
    } catch (error) {
      console.error("Erro ao criar alerta:", error);
      throw handleApiError(error, ErrorCode.ALERT_CREATION_ERROR);
    }
  };

  getAlertsByUser = async (
    filters?: AlertFilter
  ): Promise<AlertListResponseApi> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
    };
    try {
      return await this.get<AlertListResponseApi>(
        `${API_ENDPOINTS.ALERTS.USER_ALERTS}`,
        params
      );
    } catch (error) {
      console.error(`Erro ao buscar alertas para o usuário:`, error);
      throw handleApiError(error, ErrorCode.ALERT_DATA_ERROR);
    }
  };

  getAlertById = async (id: string): Promise<Alert> => {
    try {
      return await this.get<Alert>(
        `${API_ENDPOINTS.ALERTS.BASE}/${id}`,
        undefined,
        ErrorCode.ALERT_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar alerta com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.ALERT_NOT_FOUND);
    }
  };

  updateAlert = async (id: string, alert: Partial<Alert>): Promise<Alert> => {
    try {
      return await this.put<Alert>(`${API_ENDPOINTS.ALERTS.BASE}/${id}`, alert);
    } catch (error) {
      console.error(`Erro ao atualizar alerta com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.ALERT_UPDATE_ERROR);
    }
  };

  deleteAlert = async (id: string): Promise<void> => {
    try {
      await this.delete(`${API_ENDPOINTS.ALERTS.BASE}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar alerta com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.ALERT_DELETE_ERROR);
    }
  };
}

export const alertsApi = new AlertsApiService();
