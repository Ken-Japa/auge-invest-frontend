import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import {
  FII,
  FIIDividendFilter,
  FIIDividendResponse,
  FIIFilter,
  FIIListResponse,
} from "../types";

class FIIsApiService extends BaseApiService {
  getFIIs = async (filters?: FIIFilter): Promise<any> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 1000,
      ...(filters?.nome && { nome: filters.nome }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    };

    try {
      return await this.get(API_ENDPOINTS.FII.PAGINATION, params);
    } catch (error) {
      console.error("Erro ao buscar FIIs:", error);
      throw handleApiError(error, ErrorCode.FII_DATA_ERROR);
    }
  };

  getFII = async (id: string): Promise<{ success: boolean; data: FII }> => {
    try {
      return await this.get<{ success: boolean; data: FII }>(
        `${API_ENDPOINTS.FII.DETAIL}/${id}`,
        undefined,
        ErrorCode.FII_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar FII com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.FII_NOT_FOUND);
    }
  };

  searchFIIs = async (nome: string): Promise<FIIListResponse> => {
    try {
      return await this.get<FIIListResponse>(
        API_ENDPOINTS.FII.PAGINATION,
        { nome, pageSize: 10, page: 0 },
        ErrorCode.FII_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar FIIs com nome "${nome}":`, error);
      throw handleApiError(error, ErrorCode.FII_DATA_ERROR);
    }
  };

  getAllFIIs = async (): Promise<FIIListResponse> => {
    try {
      return await this.get<FIIListResponse>(
        API_ENDPOINTS.FII.PAGINATION,
        { pageSize: 1000, page: 0 },
        ErrorCode.FII_DATA_ERROR
      );
    } catch (error) {
      console.error("Erro ao buscar todas as FIIs:", error);
      throw handleApiError(error, ErrorCode.FII_DATA_ERROR);
    }
  };

  getFIIByCode = async (code: string): Promise<FII | null> => {
    try {
      const upperCode = code.trim().toUpperCase();

      const response = await this.get<FIIListResponse>(
        API_ENDPOINTS.FII.PAGINATION,
        { codigo: upperCode, pageSize: 1, page: 0 },
        ErrorCode.FII_NOT_FOUND
      );

      if (response && response.result && response.result.length > 0) {
        return response.result[0];
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar FII com código ${code}:`, error);
      throw handleApiError(error, ErrorCode.FII_NOT_FOUND);
    }
  };
  getFIIDividends = async (
    filters: FIIDividendFilter
  ): Promise<FIIDividendResponse> => {
    const params = {
      page: filters.page !== undefined ? filters.page : 0,
      pageSize: filters.pageSize || 100,
      ...(filters.nomeFII && { nomeFII: filters.nomeFII }),
    };

    try {
      return await this.get<FIIDividendResponse>(
        API_ENDPOINTS.FII.DIVIDENDS,
        params
      );
    } catch (error) {
      console.error(
        `Erro ao buscar dividendos para FII ${filters.nomeFII}:`,
        error
      );
      throw handleApiError(error, ErrorCode.FII_DATA_ERROR);
    }
  };
}

export const fiisApi = new FIIsApiService();
