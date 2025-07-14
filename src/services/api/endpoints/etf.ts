import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { ETFListResponse, ETFFilter, ETF } from "../types";

class ETFsApiService extends BaseApiService {
  getETFs = async (filters?: ETFFilter): Promise<ETFListResponse> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
      ...(filters?.nomeETF && { nomeETF: filters.nomeETF }),
      ...(filters?.codigoETF && { codigoETF: filters.codigoETF }),
      ...(filters?.codigo && { codigo: filters.codigo }),
      ...(filters?.industria && { industria: filters.industria }),
      ...(filters?.segmento && { segmento: filters.segmento }),
    };

    try {
      return await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        params
      );
    } catch (error) {
      console.error("Erro ao buscar ETFs:", error);
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR);
    }
  };

  getETF = async (id: string): Promise<{ success: boolean; data: ETF }> => {
    try {
      return await this.get<{ success: boolean; data: ETF }>(
        `${API_ENDPOINTS.ETF.DETAIL}/${id}`,
        undefined,
        ErrorCode.ETF_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar ETF com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND);
    }
  };

  searchETFs = async (nome: string): Promise<ETFListResponse> => {
    try {
      return await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        { nome, pageSize: 10, page: 0 },
        ErrorCode.ETF_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar ETFs com nome "${nome}":`, error);
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR);
    }
  };

  getAllETFs = async (): Promise<ETFListResponse> => {
    try {
      return await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        { pageSize: 1000, page: 0 },
        ErrorCode.ETF_DATA_ERROR
      );
    } catch (error) {
      console.error("Erro ao buscar todas as ETFs:", error);
      throw handleApiError(error, ErrorCode.ETF_DATA_ERROR);
    }
  };

  getETFByCode = async (code: string): Promise<ETF | null> => {
    try {
      const upperCode = code.trim().toUpperCase();

      const response = await this.get<ETFListResponse>(
        API_ENDPOINTS.ETF.PAGINATION,
        { codigo: upperCode, pageSize: 1, page: 0 },
        ErrorCode.ETF_NOT_FOUND
      );

      if (response && response.result && response.result.length > 0) {
        return response.result[0];
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar ETF com código ${code}:`, error);
      throw handleApiError(error, ErrorCode.ETF_NOT_FOUND);
    }
  };
}

export const etfApi = new ETFsApiService();
