import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { ETF, ETFFilter, ETFListResponse } from '../types'
import { getPaginationParams } from '../utils/pagination'

class ETFApiService extends BaseApiService {
  getETFs = async (filters?: ETFFilter): Promise<ETFListResponse> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
      ...(filters?.nomeETF && { nomeETF: filters.nomeETF }),
      ...(filters?.codigoETF && { codigoETF: filters.codigoETF }),
      ...(filters?.codigo && { codigo: filters.codigo }),
      ...(filters?.industria && { industria: filters.industria }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    }

    try {
      return await this.get<ETFListResponse>(API_ENDPOINTS.ETF.PAGINATION, params)
    } catch (error) {
      console.error('Erro ao buscar ETFs:', error)
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR)
    }
  }

  getETF = async (id: string): Promise<{ success: boolean; data: ETF }> => {
    try {
      return await this.get<{ success: boolean; data: ETF }>(
        `${API_ENDPOINTS.ETF.DETAIL}/${id}`,
        undefined,
        ErrorCode.ETF_NOT_FOUND,
      )
    } catch (error) {
      console.error(`Erro ao buscar ETF com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND)
    }
  }

  searchETFs = async (filters?: ETFFilter): Promise<ETFListResponse> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 10)
    const params = {
      page,
      pageSize,
      ...(filters?.nomeETF && { nomeETF: filters.nomeETF }),
    }
    try {
      return await this.get<ETFListResponse>(API_ENDPOINTS.ETF.PAGINATION, params, ErrorCode.ETF_DATA_ERROR)
    } catch (error) {
      console.error(`Erro ao pesquisar ETFs com nome "${filters?.nomeETF}":`, error)
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR)
    }
  }

  getAllETFs = async (filters?: ETFFilter): Promise<ETFListResponse> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 1000)
    try {
      return await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        { pageSize, page },
        ErrorCode.ETF_DATA_ERROR,
      )
    } catch (error) {
      console.error('Erro ao buscar todas as ETFs:', error)
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR)
    }
  }

  getETFByNomeETF = async (nomeETF: string, filters?: ETFFilter): Promise<ETF | null> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 1)
    try {
      const upperNomeETF = nomeETF.trim().toUpperCase()

      const response = await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        { nomeETF: upperNomeETF, pageSize, page },
        ErrorCode.ETF_NOT_FOUND,
      )

      if (response && response.result && response.result.length > 0) {
        return response.result[0]
      }
      return null
    } catch (error) {
      console.error(`Erro ao buscar ETF com nome ${nomeETF}:`, error)
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND)
    }
  }

  getETFByNomeCompletoETF = async (nomeCompletoETF: string, filters?: ETFFilter): Promise<ETF | null> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 1)
    try {
      const upperNomeCompletoETF = nomeCompletoETF.trim().toUpperCase()

      const response = await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        { nomeCompletoETF: upperNomeCompletoETF, pageSize, page },
        ErrorCode.ETF_NOT_FOUND,
      )

      if (response && response.result && response.result.length > 0) {
        return response.result[0]
      }
      return null
    } catch (error) {
      console.error(`Erro ao buscar ETF com nome completo ${nomeCompletoETF}:`, error)
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND)
    }
  }

  getETFByCode = async (code: string, filters?: ETFFilter): Promise<ETF | null> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 1)
    try {
      const upperCode = code.trim().toUpperCase()

      const response = await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        { codigo: upperCode, pageSize, page },
        ErrorCode.ETF_NOT_FOUND,
      )

      if (response && response.result && response.result.length > 0) {
        return response.result[0]
      }
      return null
    } catch (error) {
      console.error(`Erro ao buscar ETF com código ${code}:`, error)
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND)
    }
  }
}

export const etfApi = new ETFApiService()
