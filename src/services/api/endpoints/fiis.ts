import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { FIIListResponse, FIIFilter, FII } from "../types";

class FIIsApiService extends BaseApiService {
  getFIIs = async (filters?: FIIFilter): Promise<FIIListResponse> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
      ...(filters?.nome && { nome: filters.nome }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    };

    try {
      return await this.get<FIIListResponse>(
        API_ENDPOINTS.FII.PAGINATION,
        params
      );
    } catch (error) {
      console.error("Erro ao buscar FIIs:", error);
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };

  getFII = async (
    id: string
  ): Promise<{ success: boolean; data: FII }> => {
    try {
      return await this.get<{ success: boolean; data: FII }>(
        `${API_ENDPOINTS.FII.DETAIL}/${id}`,
        undefined,
        ErrorCode.COMPANY_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar FII com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.COMPANY_NOT_FOUND);
    }
  };

  searchFIIs = async (nome: string): Promise<FIIListResponse> => {
    try {
      return await this.get<FIIListResponse>(
        API_ENDPOINTS.FII.PAGINATION,
        { nome, pageSize: 10, page: 0 },
        ErrorCode.COMPANY_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar FIIs com nome "${nome}":`, error);
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };
}

export const fiisApi = new FIIsApiService();