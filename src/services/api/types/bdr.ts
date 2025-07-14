import { Pagination } from "./common";

export interface BDRInformation {
  cnpj: string;
  site: string;
}

export interface BDR {
  _id: string;
  nomeCompletBDR: string;
  nomeBDR: string;
  codigoBDR: string;
  codigo: string[];
  quotaCount: string;
  quotaDateApproved: string;
  industria: string;
  segmento: string;
  informacoes: BDRInformation;
}

export interface BDRListResponse {
  result: BDR[];
  pagination: Pagination;
}

export interface BDRFilter {
  nome?: string;
  segmento?: string;
  page?: number;
  pageSize?: number;
}

// FII Dividend related types
export interface BDRDividendItem {
  dataPagamento: string;
  valor: string;
  relativo: string;
  dataAprovacao: string;
  tipoDividendo: string;
  ultimoDiaCom: string;
  _id: string;
}

export interface BDRDividendData {
  _id: string;
  nomeBDR: string;
  quantidade: string;
  totalDividendos: number;
  dividendos: BDRDividendItem[];
}

export interface BDRDividendResponse {
  success: boolean;
  data: {
    result: BDRDividendData;
    pagination: Pagination;
  };
}

export interface BDRDividendFilter {
  nomeBDR?: string;
  page?: number;
  pageSize?: number;
}
