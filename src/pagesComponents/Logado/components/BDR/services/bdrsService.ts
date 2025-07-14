import { api } from "@/services/api";
import { BDRFilter } from "../types";

export const fetchBDRs = async (filter: BDRFilter = {}) => {
  try {
    if (
      filter.nomeEmpresa &&
      filter.nomeEmpresa.length < 3 &&
      filter.nomeEmpresa !== ""
    ) {
      return {
        bdrs: [],
        pagination: {
          offset: 0,
          limit: filter.pageSize || 10,
          total: 0,
          page: 1,
          pages: 1,
        },
      };
    }

    const pageSize =
      filter.pageSize && filter.pageSize > 0 ? filter.pageSize : 10;

    const response = await api.bdrs.getBDRs({
      segmento: filter.segmento,
      nomeEmpresa: filter.nomeEmpresa,
      page: filter.page !== undefined ? filter.page : 0,
      pageSize,
    });

    if (!response || !response.result || !Array.isArray(response.result)) {
      console.error("Unexpected API response structure:", response);
      throw new Error("Formato de resposta da API inesperado");
    }

    const mappedBDRs = response.result.map((bdr: any) => {
      const codigo = bdr.codigo ? [{ codigo: bdr.codigo }] : [];

      const extendedBDR: BDRExtended = {
        ...bdr,
        nomeCompleto: bdr.nomeEmpresaCompleto || "",
        dataInicio: bdr.dataInicio || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };
      return extendedBDR;
    });

    return {
      bdrs: mappedBDRs,
      pagination: response.pagination || {
        offset: 0,
        limit: pageSize,
        total: mappedBDRs.length,
        page: filter.page !== undefined ? filter.page + 1 : 1,
        pages: Math.ceil(mappedBDRs.length / pageSize) || 1,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar BDRs:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unknown error type:", error);
    }

    throw new Error(
      "Não foi possível carregar os BDRs. Tente novamente mais tarde."
    );
  }
};

export const fetchBDRBySlugOrCode = async (
  slugOrCode: string,
  isCode: boolean = false
): Promise<BDRExtended | null> => {
  try {
    const decodedSlug = decodeURIComponent(slugOrCode);

    // Se estamos buscando por código (XXXX11)
    if (isCode || /^[A-Z]{4}11$/.test(decodedSlug.toUpperCase())) {
      const upperCode = decodedSlug.trim().toUpperCase();

      const bdr = await api.bdrs.getBDRByCode(upperCode);

      if (!bdr) {
        return null;
      }

      const codigo = bdr.codigo ? [{ codigo: bdr.codigo }] : [];

      const extendedBDR: BDRExtended = {
        ...bdr,
        nomeCompleto: bdr.nomeCompletoFII || "",
        dataInicio: bdr.quotaDateApproved || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };

      return extendedBDR;
    } else {
      // Busca por nome
      const response = await api.bdrs.getBDRs({ pageSize: 100 });

      if (!response || !response.result || !Array.isArray(response.result)) {
        throw new Error("Falha ao buscar lista de BDRs");
      }

      const normalizedSearchName = decodedSlug.trim();

      const matchingBDR = response.result.find((bdr: any) => {
        const bdrName = (bdr.nomeBDR || "").trim();
        return bdrName === normalizedSearchName;
      });

      if (!matchingBDR) {
        return null;
      }

      const bdr = matchingBDR;

      const codigo = bdr.codigo ? [{ codigo: bdr.codigo }] : [];

      const extendedBDR: BDRExtended = {
        ...bdr,
        nomeCompleto: bdr.nomeCompletoFII || "",
        dataInicio: bdr.quotaDateApproved || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };

      return extendedBDR;
    }
  } catch (error) {
    console.error("Erro ao buscar BDR específico:", error);
    throw new Error(
      "Não foi possível carregar os detalhes do BDR. Tente novamente mais tarde."
    );
  }
};

export const getAllBDRs = async (): Promise<BDRExtended[]> => {
  try {
    const response = await api.bdrs.getAllBDRs();

    if (!response || !response.result || !Array.isArray(response.result)) {
      console.error("Unexpected API response structure:", response);
      return [];
    }

    // Map the response to BDRExtended format
    const mappedBDRs = response.result.map((bdr: any) => {
      const codigo = Array.isArray(bdr.codigo)
        ? bdr.codigo
        : bdr.codigo
        ? [bdr.codigo]
        : [];

      const extendedBDR: BDRExtended = {
        ...bdr,
        nomeCompleto: bdr.nomeCompletoFII || "",
        dataInicio: bdr.quotaDateApproved || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };
      return extendedBDR;
    });

    return mappedBDRs;
  } catch (error) {
    console.error("Erro ao buscar todas as BDRs:", error);
    return [];
  }
};
