import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { ETFBDR,ETFBDRFilter, ETFBDRListResponse } from "../types";

class ETFBDRsApiService extends BaseApiService {
  getETFBDRs = async (filters?: ETFBDRFilter): Promise<ETFBDRListResponse> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
      ...(filters?.nomeETF && { nomeETF: filters.nomeETF }),
      ...(filters?.codigoETF && { codigoETF: filters.codigoETF }),
      ...(filters?.industria && { industria: filters.industria }),
      ...(filters?.segmento && { segmento: filters.segmento }),
      ...(filters?.atividade && { atividade: filters.atividade }),
    };

    try {
      return await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        params
      );
    } catch (error) {
      console.error("Erro ao buscar ETFs BDR:", error);
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR);
    }
  };

  getETFBDR = async (
    id: string
  ): Promise<{ success: boolean; data: ETFBDR }> => {
    try {
      return await this.get<{ success: boolean; data: ETFBDR }>(
        `${API_ENDPOINTS.ETFBDR.DETAIL}/${id}`,
        undefined,
        ErrorCode.ETF_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar ETF BDR com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND);
    }
  };

  searchETFBDRs = async (nome: string): Promise<ETFBDRListResponse> => {
    try {
      return await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        { nome, pageSize: 10, page: 0 },
        ErrorCode.ETF_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar ETFs BDR com nome "${nome}":`, error);
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR);
    }
  };

  getAllETFBDRs = async (): Promise<ETFBDRListResponse> => {
    try {
      return await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        { pageSize: 1000, page: 0 },
        ErrorCode.ETF_DATA_ERROR
      );
    } catch (error) {
      console.error("Erro ao buscar todas as ETFs BDR:", error);
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR);
    }
  };
  getETFBDRByNomeETF = async (nomeETF: string): Promise<ETFBDR | null> => {
    try {
      const upperNomeETF = nomeETF.trim().toUpperCase();

      const response = await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        { nomeETF: upperNomeETF, pageSize: 1, page: 0 },
        ErrorCode.ETF_NOT_FOUND
      );

      if (response && response.result && response.result.length > 0) {
        return response.result[0];
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar ETF com nome ${nomeETF}:`, error);
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND);
    }
  };

  getETFBDRByCode = async (code: string): Promise<ETFBDR | null> => {
    try {
      const upperCode = code.trim().toUpperCase();

      const response = await this.get<ETFBDRListResponse>(
        API_ENDPOINTS.ETFBDR.PAGINATION,
        { codigo: upperCode, pageSize: 1, page: 0 },
        ErrorCode.ETF_NOT_FOUND
      );

      if (response && response.result && response.result.length > 0) {
        return response.result[0];
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar ETF BDR com código ${code}:`, error);
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND);
    }
  };
}

export const etfbdrApi = new ETFBDRsApiService();
