import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { DictionaryListResponse, DictionaryFilter } from "../types";

class DictionaryApiService extends BaseApiService {
  getDictionaryItems = async (filters?: DictionaryFilter): Promise<DictionaryListResponse> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
      ...(filters?.name && { name: filters.name }),
    };

    try {
      return await this.get<DictionaryListResponse>(
        API_ENDPOINTS.DICTIONARY.PAGINATION,
        params
      );
    } catch (error) {
      console.error("Erro ao buscar itens do dicionário:", error);
      throw handleApiError(error, ErrorCode.DICTIONARY_DATA_ERROR);
    }
  };
}

export const dictionaryApi = new DictionaryApiService();