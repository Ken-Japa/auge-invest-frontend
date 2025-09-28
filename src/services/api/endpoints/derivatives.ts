import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import { ErrorCode, handleApiError } from "../errorHandler";
import { DerivativeFilter,DerivativeResponse } from "../types";

class DerivativesApiService extends BaseApiService {
  getDerivatives = async (
    filters: DerivativeFilter
  ): Promise<DerivativeResponse> => {
    const params = {
      cod_empresa: filters.cod_empresa,
      page: filters.page !== undefined ? filters.page : 0,
      pageSize: filters.pageSize || 100,
    };

    try {
      const response = await this.get<DerivativeResponse>(
        API_ENDPOINTS.DERIVATIVE.PAGINATION,
        params
      );

      return response;
    } catch (error) {
      console.error(
        `Erro ao buscar derivativos para empresa ${filters.cod_empresa}:`,
        error
      );
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };
}

export const derivativesApi = new DerivativesApiService();
