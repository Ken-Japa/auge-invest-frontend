import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companiesApi } from "../services/api/endpoints/companies";
import { CompanyFilter } from "../services/api/types";

// Chaves para o React Query
export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (filters: CompanyFilter) => [...companyKeys.lists(), filters] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
  historical: (ticker: string, period: string) =>
    [...companyKeys.all, "historical", ticker, period] as const,
  dividends: (ticker: string) =>
    [...companyKeys.all, "dividends", ticker] as const,
  sectors: () => [...companyKeys.all, "sectors"] as const,
  subsectors: (setor?: string) =>
    [...companyKeys.all, "subsectors", setor] as const,
  alerts: () => [...companyKeys.all, "alerts"] as const,
  search: (query: string) => [...companyKeys.all, "search", query] as const,
};

// Hook para listar empresas
export const useCompanies = (filters?: CompanyFilter) => {
  return useQuery({
    queryKey: companyKeys.list(filters || {}),
    queryFn: () => companiesApi.getCompanies(filters),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Hook para obter detalhes de uma empresa
export const useCompany = (id: string) => {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => companiesApi.getCompany(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Hook para buscar empresas por nome
export const useSearchCompanies = (nome: string) => {
  return useQuery({
    queryKey: companyKeys.search(nome),
    queryFn: () => companiesApi.searchCompanies(nome),
    enabled: nome.length > 2, // Só busca se tiver pelo menos 3 caracteres
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
