import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { HistoricalDataFilter, HistoricalDataResponse } from '../types'
import { getPaginationParams } from '../utils/pagination'

class HistoricalApiService extends BaseApiService {
  getHistoricalData = async (filters: HistoricalDataFilter): Promise<HistoricalDataResponse> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 100)
    const params = {
      codigo: filters.codigo,
      page,
      pageSize,
      ...(filters.startDate && { startDate: filters.startDate }),
      ...(filters.endDate && { endDate: filters.endDate }),
    }

    try {
      return await this.get<HistoricalDataResponse>(API_ENDPOINTS.HISTORIC.PAGINATION, params)
    } catch (error) {
      console.error(`Erro ao buscar histórico para código ${filters.codigo}:`, error)
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR)
    }
  }
}

export const historicalApi = new HistoricalApiService()
