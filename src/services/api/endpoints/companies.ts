import { OptimizedApiService } from "../optimizedApiService";
import { API_ENDPOINTS } from "../config";
import {
  Company,
  CompanyListResponseApi,
  CompanyFilter,
  CompanyDividendFilter,
  CompanyDividendResponseApi,
} from "../types";
import { ErrorCode, handleApiError } from "../errorHandler";

class CompaniesApiService extends OptimizedApiService {
  getCompanies = async (
    filters?: CompanyFilter
  ): Promise<CompanyListResponseApi> => {
    try {
      return await this.getPaginatedData<CompanyListResponseApi>(
        API_ENDPOINTS.COMPANY.PAGINATION,
        {
          page: filters?.page ?? 0,
          pageSize: filters?.pageSize ?? 20, // Reduced page size
          filters: {
            ...(filters?.nome && { nome: filters.nome }),
            ...(filters?.setor && { setor: filters.setor }),
            ...(filters?.subsetor && { subsetor: filters.subsetor }),
          },
          cacheTTL: 10 * 60 * 1000, // Cache for 10 minutes - companies data doesn't change frequently
        }
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
      return await this.cachedGet<{ success: boolean; data: Company }>(
        `${API_ENDPOINTS.COMPANY.DETAIL}/${id}`,
        undefined,
        15 * 60 * 1000 // Cache company details for 15 minutes
      );
    } catch (error) {
      console.error(`Erro ao buscar empresa com ID ${id}:`, error);
      throw handleApiError(error, ErrorCode.COMPANY_NOT_FOUND);
    }
  };

  searchCompanies = async (nome: string): Promise<CompanyListResponseApi> => {
    try {
      return await this.get<CompanyListResponseApi>(
        API_ENDPOINTS.COMPANY.PAGINATION,
        { nome, pageSize: 10, page: 0 },
        ErrorCode.COMPANY_DATA_ERROR
      );
    } catch (error) {
      console.error(`Erro ao pesquisar empresas com nome "${nome}":`, error);
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };
  getCompanyDividends = async (
    filters: CompanyDividendFilter
  ): Promise<CompanyDividendResponseApi> => {
    try {
      return await this.getPaginatedData<CompanyDividendResponseApi>(
        API_ENDPOINTS.COMPANY.DIVIDENDS,
        {
          page: filters.page ?? 0,
          pageSize: filters.pageSize ?? 50, // Reduced from 100 to 50
          filters: {
            ...(filters.nomeEmpresa && { nomeEmpresa: filters.nomeEmpresa }),
          },
          cacheTTL: 60 * 60 * 1000, // Cache dividends for 1 hour - historical data changes less frequently
        }
      );
    } catch (error) {
      console.error(
        `Erro ao buscar dividendos para Empresa: ${filters.nomeEmpresa}:`,
        error
      );
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR);
    }
  };

  // Method to invalidate company-related cache
  invalidateCompanyCache(companyId?: string): void {
    if (companyId) {
      this.invalidateCache(`/company/${companyId}`);
    } else {
      this.invalidateCache('/company');
    }
  }

  // Prefetch company data for better UX
  async prefetchCompanyData(companyId: string): Promise<void> {
    await Promise.all([
      this.prefetch(`${API_ENDPOINTS.COMPANY.DETAIL}/${companyId}`),
      this.prefetch(API_ENDPOINTS.COMPANY.DIVIDENDS, { nomeEmpresa: companyId, pageSize: 20 })
    ]);
  }
}

export const companiesApi = new CompaniesApiService();
