import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { BDR, BDRDividendFilter, BDRDividendResponse, BDRFilter, BDRListResponse } from '../types'
import { getPaginationParams } from '../utils/pagination'

class BDRsApiService extends BaseApiService {
  getBDRs = async (filters?: BDRFilter): Promise<any> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
      ...(filters?.codigoEmpresa && { nome: filters.codigoEmpresa }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    }

    try {
      return await this.get(API_ENDPOINTS.BDR.PAGINATION, params)
    } catch (error) {
      console.error('Erro ao buscar BDRs:', error)
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }

  getBDR = async (id: string): Promise<{ success: boolean; data: BDR }> => {
    try {
      return await this.get<{ success: boolean; data: BDR }>(
        `${API_ENDPOINTS.BDR.DETAIL}/${id}`,
        undefined,
        ErrorCode.BDR_NOT_FOUND,
      )
    } catch (error) {
      console.error(`Erro ao buscar BDR com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.BDR_NOT_FOUND)
    }
  }

  searchBDRs = async (filters?: BDRFilter): Promise<BDRListResponse> => {
    try {
      const { page, pageSize } = getPaginationParams(filters, 0, 10)
      const params = {
        page,
        pageSize,
        ...(filters?.searchTerm && {
          [filters.searchBy || 'nomeEmpresa']: filters.searchTerm.toLowerCase(),
        }),
      }
      return await this.get<BDRListResponse>(API_ENDPOINTS.BDR.PAGINATION, params, ErrorCode.BDR_DATA_ERROR)
    } catch (error) {
      console.error(
        `Erro ao pesquisar BDR com ${filters?.searchBy || 'nomeEmpresa'} "${filters?.searchTerm || ''}":`,
        error,
      )
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }

  getAllBDRs = async (filters?: BDRFilter): Promise<BDRListResponse> => {
    try {
      const { page, pageSize } = getPaginationParams(filters, 0, 1000)
      return await this.get<BDRListResponse>(
        API_ENDPOINTS.BDR.PAGINATION,
        { pageSize, page },
        ErrorCode.BDR_DATA_ERROR,
      )
    } catch (error) {
      console.error('Erro ao buscar todas as BDRs:', error)
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }

  getBDRByCode = async (filters?: BDRFilter): Promise<BDRListResponse> => {
    try {
      const { page, pageSize } = getPaginationParams(filters, 0, 1)
      const params = {
        page,
        pageSize,
        ...(filters?.codigoEmpresa && {
          codigo: filters.codigoEmpresa.toUpperCase(),
        }),
      }
      return await this.get<BDRListResponse>(API_ENDPOINTS.BDR.PAGINATION, params, ErrorCode.BDR_DATA_ERROR)
    } catch (error) {
      console.error(`Erro ao buscar BDR pelo código ${filters?.codigoEmpresa || ''}:`, error)
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }
  getBDRDividends = async (filters: BDRDividendFilter): Promise<BDRDividendResponse> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
      ...(filters.nomeEmpresa && { nomeEmpresa: filters.nomeEmpresa }),
    }

    try {
      return await this.get<BDRDividendResponse>(API_ENDPOINTS.BDR.DIVIDENDS, params)
    } catch (error) {
      console.error(`Erro ao buscar dividendos para BDR ${filters.nomeEmpresa}:`, error)
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }
}

export const bdrsApi = new BDRsApiService()
