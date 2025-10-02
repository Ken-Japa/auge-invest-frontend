import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { BDRNP, BDRNPFilter, BDRNPListResponse } from '../types'
import { getPaginationParams } from '../utils/pagination'

class BDRNPApiService extends BaseApiService {
  getBDRNPs = async (filters?: BDRNPFilter): Promise<any> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
      ...(filters?.codigoEmpresa && { nome: filters.codigoEmpresa }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    }

    try {
      return await this.get(API_ENDPOINTS.BDRNP.PAGINATION, params)
    } catch (error) {
      console.error('Erro ao buscar BDRs:', error)
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }

  getBDRNP = async (id: string): Promise<{ success: boolean; data: BDRNP }> => {
    try {
      return await this.get<{ success: boolean; data: BDRNP }>(
        `${API_ENDPOINTS.BDRNP.DETAIL}/${id}`,
        undefined,
        ErrorCode.BDR_NOT_FOUND,
      )
    } catch (error) {
      console.error(`Erro ao buscar BDR com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.BDR_NOT_FOUND)
    }
  }

  /**
   * Searches for BDRNPs based on a search term and criteria, with pagination.
   * @param filters - An object containing search filters, including searchTerm, searchBy, page, and pageSize.
   * @returns A promise that resolves to a BDRNPListResponse.
   */
  searchBDRNPs = async (filters?: BDRNPFilter): Promise<BDRNPListResponse> => {
    try {
      const { page, pageSize } = getPaginationParams(filters, 0, 10)
      const params = {
        page,
        pageSize,
        ...(filters?.searchTerm && { [filters.searchBy || 'nomeEmpresa']: filters.searchTerm.toLowerCase() }),
      }
      return await this.get<BDRNPListResponse>(
        API_ENDPOINTS.BDRNP.PAGINATION,
        params,
        ErrorCode.BDR_DATA_ERROR,
      )
    } catch (error) {
      console.error(
        `Erro ao pesquisar BDRNP com ${filters?.searchBy || 'nomeEmpresa'} "${filters?.searchTerm || ''}":`,
        error,
      )
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }

  getAllBDRNPs = async (): Promise<BDRNPListResponse> => {
    try {
      const { page, pageSize } = getPaginationParams({ pageSize: 1000, page: 0 })
      return await this.get<BDRNPListResponse>(
        API_ENDPOINTS.BDRNP.PAGINATION,
        { pageSize, page },
        ErrorCode.BDR_DATA_ERROR,
      )
    } catch (error) {
      console.error('Erro ao buscar todas as BDRs:', error)
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR)
    }
  }

  getBDRNPByCode = async (code: string): Promise<BDRNP | null> => {
    try {
      const upperCode = code.trim().toUpperCase()

      const { page, pageSize } = getPaginationParams({ pageSize: 1, page: 0 })
      const response = await this.get<BDRNPListResponse>(
        API_ENDPOINTS.BDRNP.PAGINATION,
        { codigo: upperCode, pageSize, page },
        ErrorCode.BDR_NOT_FOUND,
      )

      if (response && response.result && response.result.length > 0) {
        return response.result[0]
      }
      return null
    } catch (error) {
      console.error(`Erro ao buscar BDR com código ${code}:`, error)
      throw handleApiError(error, ErrorCode.BDR_NOT_FOUND)
    }
  }
}

export const bdrnpApi = new BDRNPApiService()
