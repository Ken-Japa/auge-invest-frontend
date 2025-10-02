import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { ETFBDR, ETFBDRFilter, ETFBDRListResponse } from '../types'
import { getPaginationParams } from '../utils/pagination'

class ETFBDRsApiService extends BaseApiService {
  getETFBDRs = async (filters?: ETFBDRFilter): Promise<ETFBDRListResponse> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
      ...(filters?.nomeETF && { nomeETF: filters.nomeETF }),
      ...(filters?.codigoETF && { codigoETF: filters.codigoETF }),
      ...(filters?.industria && { industria: filters.industria }),
      ...(filters?.segmento && { segmento: filters.segmento }),
      ...(filters?.atividade && { atividade: filters.atividade }),
    }
    try {
      return await this.get<ETFBDRListResponse>(API_ENDPOINTS.ETFBDR.PAGINATION, params)
    } catch (error) {
      console.error('Erro ao buscar ETFs BDR:', error)
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR)
    }
  }

  getETFBDR = async (id: string): Promise<{ success: boolean; data: ETFBDR }> => {
    try {
      return await this.get<{ success: boolean; data: ETFBDR }>(
        `${API_ENDPOINTS.ETFBDR.DETAIL}/${id}`,
        undefined,
        ErrorCode.ETF_NOT_FOUND,
      )
    } catch (error) {
      console.error(`Erro ao buscar ETF BDR com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND)
    }
  }

  /**
   * Busca ETFs BDRs por nome, utilizando paginação.
   * @param filters - Filtros de paginação e busca.
   * @returns Uma promessa que resolve para uma lista de ETFs BDRs.
   */
  searchETFBDRs = async (filters?: ETFBDRFilter): Promise<ETFBDRListResponse> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 10)
    const params = {
      ...(filters?.nome && { nome: filters.nome }),
      page,
      pageSize,
    }
    try {
      return await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        params,
        ErrorCode.ETF_DATA_ERROR,
      )
    } catch (error) {
      console.error(`Erro ao pesquisar ETFs BDR:`, error)
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR)
    }
  }

  /**
   * Busca todos os ETFs BDRs, utilizando paginação.
   * @param filters - Filtros de paginação.
   * @returns Uma promessa que resolve para uma lista de ETFs BDRs.
   */
  getAllETFBDRs = async (filters?: ETFBDRFilter): Promise<ETFBDRListResponse> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 1000)
    const params = {
      page,
      pageSize,
    }
    try {
      return await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        params,
        ErrorCode.ETF_DATA_ERROR,
      )
    } catch (error) {
      console.error('Erro ao buscar todas as ETFs BDR:', error)
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR)
    }
  }
  /**
   * Busca um ETF BDR pelo nome, utilizando paginação.
   * @param filters - Filtros de paginação e busca.
   * @returns Uma promessa que resolve para um ETF BDR ou null se não encontrado.
   */
  getETFBDRByNomeETF = async (filters?: ETFBDRFilter): Promise<ETFBDR | null> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 1)
    try {
      const upperNomeETF = filters?.nomeETF?.trim().toUpperCase()

      const response = await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        {
          nomeETF: upperNomeETF,
          page,
          pageSize,
        },
        ErrorCode.ETF_NOT_FOUND,
      )

      if (response && response.result && response.result.length > 0) {
        return response.result[0]
      }
      return null
    } catch (error) {
      console.error(`Erro ao buscar ETF com nome ${filters?.nomeETF}:`, error)
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND)
    }
  }

  /**
   * Busca um ETF BDR pelo código, utilizando paginação.
   * @param filters - Filtros de paginação e busca.
   * @returns Uma promessa que resolve para um ETF BDR ou null se não encontrado.
   */
  getETFBDRByCode = async (filters?: ETFBDRFilter): Promise<ETFBDR | null> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 1)
    try {
      const upperCode = filters?.codigo?.trim().toUpperCase()

      const response = await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        {
          codigo: upperCode,
          page,
          pageSize,
        },
        ErrorCode.ETF_NOT_FOUND,
      )

      if (response && response.result && response.result.length > 0) {
        return response.result[0]
      }
      return null
    } catch (error) {
      console.error(`Erro ao buscar ETF BDR com código ${filters?.codigo}:`, error)
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND)
    }
  }
}

export const etfbdrApi = new ETFBDRsApiService()
