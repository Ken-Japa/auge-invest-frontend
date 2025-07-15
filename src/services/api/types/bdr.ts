import { Pagination } from "./common";

export interface BDRInformation {
  cnpj: string;
  site: string;
  marketIndicator: string;
  status: string;
  tipo: string;
  market: string;
}

export interface BDR {
  _id: string;
  nomeEmpresaCompleto: string;
  nomeEmpresa: string;
  codigoEmpresa: string;
  codigoCVM: string;
  dataInicio: string;
  indústria: string | null;
  segmento: string | null;
  atividade: string | null;
  tipoBDR: string;
  codigo: string;
  __v?: number;
  informações: BDRInformation;
}

export interface BDRListResponse {
  result: BDR[];
  pagination: Pagination;
}

export interface BDRFilter {
  nomeEmpresa?: string;
  codigoEmpresa?: string;
  segmento?: string;
  page?: number;
  pageSize?: number;
}

// BDR Dividend related types
export interface BDRDividendItem {
  tipo: string;
  dataAprovacao: string;
  valor: string;
  dataPagamento: string;
  ultimoDiaCom: string;
  _id: string;
}

export interface BDRDividendData {
  _id: string;
  nomeEmpresa: string;
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
  nomeEmpresa?: string;
  page?: number;
  pageSize?: number;
}
