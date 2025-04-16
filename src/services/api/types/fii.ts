import { Pagination } from './common';

export interface FIIInformation {
  cnpj: string;
  site: string;
}

export interface FII {
  _id: string;
  nomeCompletoFII: string;
  nomeFII: string;
  codigoFII: string;
  codigo: string[];
  quotaCount: string;
  quotaDateApproved: string;
  industria: string;
  segmento: string;
  informacoes: FIIInformation;
}

export interface FIIListResponse {
  result: FII[];
  pagination: Pagination;
}

export interface FIIFilter {
  nome?: string;
  segmento?: string;
  page?: number;
  pageSize?: number;
}

// FII Dividend related types
export interface FIIDividendItem {
  dataPagamento: string;
  valor: string;
  relativo: string;
  dataAprovacao: string;
  tipoDividendo: string;
  ultimoDiaCom: string;
  _id: string;
}

export interface FIIDividendData {
  _id: string;
  nomeFII: string;
  quantidade: string;
  totalDividendos: number;
  dividendos: FIIDividendItem[];
}

export interface FIIDividendResponse {
  success: boolean;
  data: {
    result: FIIDividendData;
    pagination: Pagination;
  };
}

export interface FIIDividendFilter {
  nomeFII?: string;
  page?: number;
  pageSize?: number;
}