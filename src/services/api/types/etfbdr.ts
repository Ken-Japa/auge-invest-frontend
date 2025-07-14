import { Pagination } from "./common";

export interface ETFBDR {
  _id: string;
  nomeCompletoETF: string;
  nomeETF: string;
  codigoETF: string;
  codigo: string;
  codigoCVM: string;
  industria: string | null;
  segmento: string | null;
  atividade: string | null;
  __v?: number | null;
  informações: ETFBDRInformation;
}

export interface ETFBDRInformation {
  status: string;
  marketIndicator: string;
  dataInicio: string;
  tipo: string;
}
