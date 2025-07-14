import { Pagination } from "./common";

export interface BDRNPInformation {
  cnpj: string;
  site: string;
  marketIndicator: string;
  status: string;
  tipo: string;
  market: string;
}

export interface BDRNP {
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
  informações: BDRNPInformation;
}

export interface BDRNPListResponse {
  result: BDRNP[];
  pagination: Pagination;
}

export interface BDRNPFilter {
  nomeEmpresa?: string;
  codigoEmpresa?: string;
  segmento?: string;
  page?: number;
  pageSize?: number;
}
// BDR Dividend related types
export interface BDRNPDividendItem {
  tipo: string;
  dataAprovacao: string;
  valor: string;
  dataPagamento: string;
  ultimoDiaCom: string;
  _id: string;
}

export interface BDRNPDividendData {
  _id: string;
  nomeEmpresa: string;
  totalDividendos: number;
  dividendos: BDRNPDividendItem[];
}

export interface BDRNPDividendResponse {
  success: boolean;
  data: {
    result: BDRNPDividendData;
    pagination: Pagination;
  };
}

export interface BDRNPDividendFilter {
  nomeEmpresa?: string;
  nomeBDR?: string;
  page?: number;
  pageSize?: number;
}
