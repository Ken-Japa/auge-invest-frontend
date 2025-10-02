import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { DictionaryFilter, DictionaryListResponse } from '../types'
import { getPaginationParams } from '../utils/pagination'

class DictionaryApiService extends BaseApiService {
  getDictionary = async (filters?: DictionaryFilter): Promise<DictionaryListResponse> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
      ...(filters?.name && { name: filters.name }),
    }

    try {
      return await this.get<DictionaryListResponse>(API_ENDPOINTS.DICTIONARY.PAGINATION, params)
    } catch (error) {
      console.error('Erro ao buscar itens do dicionário:', error)
      throw handleApiError(error, ErrorCode.DICTIONARY_DATA_ERROR)
    }
  }
}

export const dictionaryApi = new DictionaryApiService()
