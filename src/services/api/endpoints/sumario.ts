import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { SumarioListResponse, SumarioFilter } from "../types";

class SumarioApiService extends BaseApiService {
  getSumarioItems = async (
    filters?: SumarioFilter
  ): Promise<SumarioListResponse> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
    };

    try {
      return await this.get<SumarioListResponse>(
        API_ENDPOINTS.DICTIONARY.PAGINATION,
        params
      );
    } catch (error) {
      console.error("Erro ao buscar itens do dicionário:", error);
      throw handleApiError(error, ErrorCode.DICTIONARY_DATA_ERROR);
    }
  };
}

export const sumarioApi = new SumarioApiService();
