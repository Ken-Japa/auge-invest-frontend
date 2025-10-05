import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { Alert, AlertFilter, AlertListResponseApi } from '../types/alert-types'
import { getPaginationParams } from '../utils/pagination'

class AlertsApiService extends BaseApiService {
  /**
   * Cria um novo alerta no sistema.
   * @param {Alert} alert O objeto de alerta a ser criado.
   * @returns {Promise<Alert>} Uma promessa que resolve com o alerta criado.
   */
  createAlert = async (alert: Alert) => {
    try {
      const { userId, ...alertWithoutUserId } = alert
      return await this.post<Alert>(API_ENDPOINTS.ALERTS.BASE, alertWithoutUserId)
    } catch (error) {
      console.error('Erro ao criar alerta:', error)
      throw handleApiError(error, ErrorCode.ALERT_CREATION_ERROR)
    }
  }

  /**
   * Busca alertas por usuário, com suporte a filtros de paginação.
   * @param {AlertFilter} [filters] Filtros para a busca de alertas, incluindo paginação.
   * @returns {Promise<AlertListResponseApi>} Uma promessa que resolve com a lista de alertas e informações de paginação.
   */
  getAlertsByUser = async (filters?: AlertFilter): Promise<AlertListResponseApi> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
    }
    try {
      return await this.get<AlertListResponseApi>(`${API_ENDPOINTS.ALERTS.USER_ALERTS}`, params)
    } catch (error) {
      console.error(`Erro ao buscar alertas para o usuário:`, error)
      throw handleApiError(error, ErrorCode.ALERT_DATA_ERROR)
    }
  }

  /**
   * Busca um alerta específico pelo seu ID.
   * @param {string} id O ID do alerta a ser buscado.
   * @returns {Promise<Alert>} Uma promessa que resolve com o alerta encontrado.
   */
  getAlertById = async (id: string): Promise<Alert> => {
    try {
      return await this.get<Alert>(`${API_ENDPOINTS.ALERTS.BASE}/${id}`, undefined, ErrorCode.ALERT_NOT_FOUND)
    } catch (error) {
      console.error(`Erro ao buscar alerta com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.ALERT_NOT_FOUND)
    }
  }

  /**
   * Atualiza um alerta existente pelo seu ID.
   * @param {string} id O ID do alerta a ser atualizado.
   * @param {Partial<Alert>} alert Os dados parciais do alerta a serem atualizados.
   * @returns {Promise<Alert>} Uma promessa que resolve com o alerta atualizado.
   */
  updateAlert = async (id: string, alert: Partial<Alert>): Promise<Alert> => {
    try {
      return await this.put<Alert>(`${API_ENDPOINTS.ALERTS.BASE}/${id}`, alert)
    } catch (error) {
      console.error(`Erro ao atualizar alerta com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.ALERT_UPDATE_ERROR)
    }
  }

  /**
   * Deleta um alerta existente pelo seu ID.
   * @param {string} id O ID do alerta a ser deletado.
   * @returns {Promise<void>} Uma promessa que resolve quando o alerta é deletado com sucesso.
   */
  deleteAlert = async (id: string): Promise<void> => {
    try {
      await this.delete(`${API_ENDPOINTS.ALERTS.BASE}/${id}`)
    } catch (error) {
      console.error(`Erro ao deletar alerta com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.ALERT_DELETE_ERROR)
    }
  }
}

export const alertsApi = new AlertsApiService()
