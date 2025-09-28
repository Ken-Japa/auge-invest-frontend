import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { SumarioFilter,SumarioListResponseApi } from "../types";

class SumarioApiService extends BaseApiService {
  getSumarioItems = async (
    filters?: SumarioFilter
  ): Promise<SumarioListResponseApi> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
    };

    try {
      return await this.get<SumarioListResponseApi>(
        API_ENDPOINTS.SUMARIO.PAGINATION,
        params
      );
    } catch (error) {
      console.error("Erro ao buscar itens do dicionário:", error);
      throw handleApiError(error, ErrorCode.DICTIONARY_DATA_ERROR);
    }
  };
}

export const sumarioApi = new SumarioApiService();
