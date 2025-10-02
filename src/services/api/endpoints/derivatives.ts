import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { DerivativeFilter, DerivativeResponse } from '../types'
import { getPaginationParams } from '../utils/pagination'

class DerivativesApiService extends BaseApiService {
  getDerivatives = async (filters: DerivativeFilter): Promise<DerivativeResponse> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      cod_empresa: filters.cod_empresa,
      page,
      pageSize,
    }

    try {
      const response = await this.get<DerivativeResponse>(API_ENDPOINTS.DERIVATIVE.PAGINATION, params)

      return response
    } catch (error) {
      console.error(`Erro ao buscar derivativos para empresa ${filters.cod_empresa}:`, error)
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR)
    }
  }
}

export const derivativesApi = new DerivativesApiService()
