import { Pagination } from "./common";

export interface ETF {
  _id: string;
  nomeCompletoETF: string;
  nomeETF: string;
  codigoETF: string;
  codigo: string;
  quotaCount: string;
  quotaDateApproved: string | null;
  indústria: string | null;
  segmento: string | null;
  __v?: number | null;
  informações: ETFInformation;
}

export interface ETFInformation {
  cnpj: string;
  site: string;
}
