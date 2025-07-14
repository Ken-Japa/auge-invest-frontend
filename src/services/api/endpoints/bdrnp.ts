import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import {
  BDRNPListResponse,
  BDRNPFilter,
  BDRNP,
  BDRNPDividendResponse,
  BDRNPDividendFilter,
} from "../types";

class BDRNPApiService extends BaseApiService {
  getBDRNPs = async (filters?: BDRNPFilter): Promise<any> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
      ...(filters?.codigoEmpresa && { nome: filters.codigoEmpresa }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    };

    try {
      return await this.get(API_ENDPOINTS.BDRNP.PAGINATION, params);
    } catch (error) {
      console.error("Erro ao buscar BDRs:", error);
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };

  getBDRNP = async (id: string): Promise<{ success: boolean; data: BDRNP }> => {
    try {
      return await this.get<{ success: boolean; data: BDRNP }>(
        `${API_ENDPOINTS.BDRNP.DETAIL}/${id}`,
        undefined,
        ErrorCode.BDR_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar BDR com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.BDR_NOT_FOUND);
    }
  };

  searchBDRNPs = async (searchTerm: string, searchBy: 'nomeEmpresa' | 'codigoEmpresa' = 'nomeEmpresa'): Promise<BDRNPListResponse> => {
    try {
      return await this.get<BDRNPListResponse>(
        API_ENDPOINTS.BDRNP.PAGINATION,
        { [searchBy]: searchTerm, pageSize: 10, page: 0 },
        ErrorCode.BDR_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar BDR com ${searchBy} "${searchTerm}":`, error);
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };

  getAllBDRNPs = async (): Promise<BDRNPListResponse> => {
    try {
      return await this.get<BDRNPListResponse>(
        API_ENDPOINTS.BDRNP.PAGINATION,
        { pageSize: 1000, page: 0 },
        ErrorCode.BDR_DATA_ERROR
      );
    } catch (error) {
      console.error("Erro ao buscar todas as BDRs:", error);
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };

  getBDRNPByCode = async (code: string): Promise<BDRNP | null> => {
    try {
      const upperCode = code.trim().toUpperCase();

      const response = await this.get<BDRNPListResponse>(
        API_ENDPOINTS.BDRNP.PAGINATION,
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
  getBDRNPDividends = async (
    filters: BDRNPDividendFilter
  ): Promise<BDRNPDividendResponse> => {
    const params = {
      page: filters.page !== undefined ? filters.page : 0,
      pageSize: filters.pageSize || 100,
      ...(filters.nomeEmpresa && { nomeEmpresa: filters.nomeEmpresa }),
    };

    try {
      return await this.get<BDRNPDividendResponse>(
        API_ENDPOINTS.BDRNP.DIVIDENDS,
        params
      );
    } catch (error) {
      console.error(
        `Erro ao buscar dividendos para BDR ${filters.nomeEmpresa}:`,
        error
      );
      throw handleApiError(error, ErrorCode.BDR_DATA_ERROR);
    }
  };
}

export const bdrnpApi = new BDRNPApiService();
