import { Pagination } from './common';

export interface DerivativeItem {
  "COD Opcao": string;
  "Call ou Put": string;
  Tipo: string;
  "ON ou PN": string;
  Strike: string;
  Vencimento: string;
  "Ultimo Preco": number;
  "Data Negocio": string | null;
  "Hora Negocio": string;
  "Oferta Compra": number;
  "Oferta Venda": number;
  Volume: number;
  Contratos: number;
  _id: string;
}

export interface DerivativeResponse {
  success: boolean;
  data: {
    _id: string;
    Empresa: string;
    "COD Empresa": string;
    totalDerivativos: number;
    Derivativos: DerivativeItem[];
    pagination: Pagination;
  };
}

export interface DerivativeFilter {
  cod_empresa: string;
  page?: number;
  pageSize?: number;
}