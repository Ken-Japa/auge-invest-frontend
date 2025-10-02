import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import {
  Company,
  CompanyDividendFilter,
  CompanyDividendResponseApi,
  CompanyFilter,
  CompanyListResponseApi,
} from '../types'
import { getPaginationParams } from '../utils/pagination'

class CompaniesApiService extends BaseApiService {
  getCompanies = async (filters?: CompanyFilter): Promise<CompanyListResponseApi> => {
    const { page, pageSize } = getPaginationParams(filters)
    const params = {
      page,
      pageSize,
      ...(filters?.nome && { nome: filters.nome }),
      ...(filters?.setor && { setor: filters.setor }),
      ...(filters?.subsetor && { subsetor: filters.subsetor }),
    }

    try {
      return await this.get<CompanyListResponseApi>(API_ENDPOINTS.COMPANY.PAGINATION, params)
    } catch (error) {
      console.error('Erro ao buscar companhias:', error)
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR)
    }
  }

  getCompany = async (id: string): Promise<{ success: boolean; data: Company }> => {
    try {
      return await this.get<{ success: boolean; data: Company }>(
        `${API_ENDPOINTS.COMPANY.DETAIL}/${id}`,
        undefined,
        ErrorCode.COMPANY_NOT_FOUND,
      )
    } catch (error) {
      console.error(`Erro ao buscar empresa com ID ${id}:`, error)
      throw handleApiError(error, ErrorCode.COMPANY_NOT_FOUND)
    }
  }

  searchCompanies = async (filters?: CompanyFilter): Promise<CompanyListResponseApi> => {
    try {
      const { page, pageSize } = getPaginationParams(filters, 0, 10)
      const params = {
        page,
        pageSize,
        ...(filters?.nome && { nome: filters.nome }),
      }
      return await this.get<CompanyListResponseApi>(
        API_ENDPOINTS.COMPANY.PAGINATION,
        params,
        ErrorCode.COMPANY_DATA_ERROR,
      )
    } catch (error) {
      console.error(`Erro ao pesquisar empresas com nome "${filters?.nome || ''}":`, error)
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR)
    }
  }
  getCompanyDividends = async (filters: CompanyDividendFilter): Promise<CompanyDividendResponseApi> => {
    const { page, pageSize } = getPaginationParams(filters, 0, 100)
    const params = {
      page,
      pageSize,
      ...(filters.nomeEmpresa && { nomeEmpresa: filters.nomeEmpresa }),
    }

    try {
      return await this.get<CompanyDividendResponseApi>(API_ENDPOINTS.COMPANY.DIVIDENDS, params)
    } catch (error) {
      console.error(`Erro ao buscar dividendos para Empresa: ${filters.nomeEmpresa}:`, error)
      throw handleApiError(error, ErrorCode.COMPANY_DATA_ERROR)
    }
  }
}

export const companiesApi = new CompaniesApiService()
