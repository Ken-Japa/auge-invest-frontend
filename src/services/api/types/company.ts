import { Pagination } from "./common";

export interface CompanyCode {
  codigo: string;
  derivativos: boolean;
  dataInicial: string;
  preco: number | null;
  valorMercado: number | null;
}

export interface Company {
  _id: string;
  nome: string;
  setor: string;
  subsetor: string;
  descricao: string;
  site: string;
  derivativos: boolean;
  codigos: CompanyCode[];
}

export interface CompanyListResponse {
  success: boolean;
  data: {
    companies: Company[];
    pagination: Pagination;
  };
}

export interface CompanyFilter {
  nome?: string;
  setor?: string;
  subsetor?: string;
  page?: number;
  pageSize?: number;
}

// FII Dividend related types
export interface CompanyDividendItem {
  tipo: string;
  dataAprovacao: string;
  valor: string;
  ratio: string;
  tipoDividendo: string;
  ultimoDiaCom: string;
  valorUltimoDiaCom: string;
  _id: string;
}

export interface CompanyDividendData {
  _id: string;
  nomeEmpresa: string;
  totalDividendos: number;
  dividendos: CompanyDividendItem[];
}

export interface CompanyDividendResponse {
  success: boolean;
  data: {
    result: CompanyDividendData;
    pagination: Pagination;
  };
}

export interface CompanyDividendFilter {
  nomeEmpresa?: string;
  page?: number;
  pageSize?: number;
}

// Legacy Company types (keeping for backward compatibility)
export interface LegacyCompany {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  description?: string;
  marketCap?: number;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}
