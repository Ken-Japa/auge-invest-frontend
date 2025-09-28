import { api } from "@/services/api";

export interface DerivativoItem {
  "COD Opcao": string;
  "Call ou Put": string;
  "Tipo": string;
  "ON ou PN": string;
  "Strike": string;
  "Vencimento": string;
  "Ultimo Preco": number;
  "Data Negocio": string | null;
  "Hora Negocio": string;
  "Oferta Compra": number;
  "Oferta Venda": number;
  "Volume": number;
  "Contratos": number;
  "_id": string;
}

export interface DerivativosResponse {
  _id: string;
  Empresa: string;
  "COD Empresa": string;
  totalDerivativos: number;
  Derivativos: DerivativoItem[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
    page: number;
    pages: number;
  };
}

export const getDerivativosData = async (
  codigoEmpresa: string,
  page = 0,
  pageSize = 100
): Promise<DerivativosResponse> => {
  try {
    const response = await api.derivatives.getDerivatives({
      cod_empresa: codigoEmpresa,
      page,
      pageSize
    });

    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar derivativos para ${codigoEmpresa}:`, error);
    throw new Error(`Falha ao carregar derivativos para ${codigoEmpresa}`);
  }
};