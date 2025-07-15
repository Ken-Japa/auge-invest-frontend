import { BaseApiService } from "../baseService";
import { API_ENDPOINTS } from "../config";
import {
  Company,
  CompanyListResponse,
  CompanyFilter,
  CompanyDividendFilter,
  CompanyDividendResponse,
} from "../types";
import { ErrorCode, handleApiError } from "../errorHandler";

class CompaniesApiService extends BaseApiService {
  getCompanies = async (
    filters?: CompanyFilter
  ): Promise<CompanyListResponse> => {
    const params = {
      page: filters?.page !== undefined ? filters.page : 0,
      pageSize: filters?.pageSize || 10,
      ...(filters?.nome && { nome: filters.nome }),
      ...(filters?.setor && { setor: filters.setor }),
      ...(filters?.subsetor && { subsetor: filters.subsetor }),
    };

    try {
      return await this.get<CompanyListResponse>(
        API_ENDPOINTS.COMPANY.PAGINATION,
        params
      );
    } catch (error) {
      console.error("Erro ao buscar companhias:", error);
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };

  getCompany = async (
    id: string
  ): Promise<{ success: boolean; data: Company }> => {
    try {
      return await this.get<{ success: boolean; data: Company }>(
        `${API_ENDPOINTS.COMPANY.DETAIL}/${id}`,
        undefined,
        ErrorCode.COMPANY_NOT_FOUND
      );
    } catch (error) {
      console.error(`Erro ao buscar empresa com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.COMPANY_NOT_FOUND);
    }
  };

  searchCompanies = async (nome: string): Promise<CompanyListResponse> => {
    try {
      return await this.get<CompanyListResponse>(
        API_ENDPOINTS.COMPANY.PAGINATION,
        { nome, pageSize: 10, page: 0 },
        ErrorCode.COMPANY_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar empresas com nome "${nome}":`, error);
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };
  getFIIDividends = async (
    filters: CompanyDividendFilter
  ): Promise<CompanyDividendResponse> => {
    const params = {
      page: filters.page !== undefined ? filters.page : 0,
      pageSize: filters.pageSize || 100,
      ...(filters.nomeEmpresa && { nomeEmpresa: filters.nomeEmpresa }),
    };

    try {
      return await this.get<CompanyDividendResponse>(
        API_ENDPOINTS.COMPANY.DIVIDENDS,
        params
      );
    } catch (error) {
      console.error(
        `Erro ao buscar dividendos para Empresa: ${filters.nomeEmpresa}:`,
        error
      );
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };
}

export const companiesApi = new CompaniesApiService();
