import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import {
  BDRListResponse,
  BDRFilter,
  BDR,
  BDRDividendResponse,
  BDRDividendFilter,
} from "../types";

class BDRsApiService extends BaseApiService {
  getBDRs = async (filters?: BDRFilter): Promise<any> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
      ...(filters?.nome && { nome: filters.nome }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    };

    try {
      return await this.get(API_ENDPOINTS.BDR.PAGINATION, params);
    } catch (error) {
      console.error("Erro ao buscar BDRs:", error);
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };

  getBDR = async (id: string): Promise<{ success: boolean; data: BDR }> => {
    try {
      return await this.get<{ success: boolean; data: BDR }>(
        `${API_ENDPOINTS.BDR.DETAIL}/${id}`,
        undefined,
        ErrorCode.BDR_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar BDR com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.BDR_NOT_FOUND);
    }
  };

  searchBDRs = async (nome: string): Promise<BDRListResponse> => {
    try {
      return await this.get<BDRListResponse>(
        API_ENDPOINTS.BDR.PAGINATION,
        { nome, pageSize: 10, page: 0 },
        ErrorCode.BDR_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar BDR com nome "${nome}":`, error);
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };

  getAllBDRs = async (): Promise<BDRListResponse> => {
    try {
      return await this.get<BDRListResponse>(
        API_ENDPOINTS.BDR.PAGINATION,
        { pageSize: 1000, page: 0 },
        ErrorCode.BDR_DATA_ERROR
      );
    } catch (error) {
      console.error("Erro ao buscar todas as BDRs:", error);
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };

  getBDRByCode = async (code: string): Promise<BDR | null> => {
    try {
      const upperCode = code.trim().toUpperCase();

      const response = await this.get<BDRListResponse>(
        API_ENDPOINTS.BDR.PAGINATION,
        { codigo: upperCode, pageSize: 1, page: 0 },
        ErrorCode.BDR_NOT_FOUND
      );

      if (response && response.result && response.result.length > 0) {
        return response.result[0];
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar BDR com código ${code}:`, error);
      throw handleApiError(error, ErrorCode.BDR_NOT_FOUND);
    }
  };
  getBDRDividends = async (
    filters: BDRDividendFilter
  ): Promise<BDRDividendResponse> => {
    const params = {
      page: filters.page !== undefined ? filters.page : 0,
      pageSize: filters.pageSize || 100,
      ...(filters.nomeBDR && { nomeBDR: filters.nomeBDR }),
    };

    try {
      return await this.get<BDRDividendResponse>(
        API_ENDPOINTS.BDR.DIVIDENDS,
        params
      );
    } catch (error) {
      console.error(
        `Erro ao buscar dividendos para BDR ${filters.nomeBDR}:`,
        error
      );
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };
}

export const bdrsApi = new BDRsApiService();
