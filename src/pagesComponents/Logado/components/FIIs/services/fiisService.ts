import { api } from "@/services/api";
import { FIIExtended, FIIFilter } from "../types";

export const fetchFIIs = async (filter: FIIFilter = {}) => {
  try {
    if (filter.nome && filter.nome.length < 3 && filter.nome !== "") {
      return {
        fiis: [],
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

    const response = await api.fiis.getFIIs({
      segmento: filter.segmento,
      nome: filter.nome,
      page: filter.page !== undefined ? filter.page : 0,
      pageSize,
    });

    if (!response || !response.result || !Array.isArray(response.result)) {
      console.error("Unexpected API response structure:", response);
      throw new Error("Formato de resposta da API inesperado");
    }

    const mappedFIIs = response.result.map((fii: any) => {
      const codigo = Array.isArray(fii.codigo)
        ? fii.codigo
        : fii.codigo
        ? [fii.codigo]
        : [];

      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || "",
        dataInicio: fii.quotaDateApproved || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };
      return extendedFII;
    });

    return {
      fiis: mappedFIIs,
      pagination: response.pagination || {
        offset: 0,
        limit: pageSize,
        total: mappedFIIs.length,
        page: filter.page !== undefined ? filter.page + 1 : 1,
        pages: Math.ceil(mappedFIIs.length / pageSize) || 1,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar FIIs:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unknown error type:", error);
    }

    throw new Error(
      "Não foi possível carregar os FIIs. Tente novamente mais tarde."
    );
  }
};

export const fetchFIIBySlugOrCode = async (
  slugOrCode: string,
  isCode: boolean = false
): Promise<FIIExtended | null> => {
  try {
    const decodedSlug = decodeURIComponent(slugOrCode);

    // Se estamos buscando por código (XXXX11)
    if (isCode || /^[A-Z]{4}11$/.test(decodedSlug.toUpperCase())) {
      const upperCode = decodedSlug.trim().toUpperCase();

      const fii = await api.fiis.getFIIByCode(upperCode);

      if (!fii) {
        return null;
      }

      const codigo = Array.isArray(fii.codigo)
        ? fii.codigo
        : fii.codigo
        ? [fii.codigo]
        : [];

      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || "",
        dataInicio: fii.quotaDateApproved || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };

      return extendedFII;
    } else {
      // Busca por nome
      const response = await api.fiis.getFIIs({ pageSize: 100 });

      if (!response || !response.result || !Array.isArray(response.result)) {
        throw new Error("Falha ao buscar lista de FIIs");
      }

      const normalizedSearchName = decodedSlug.trim();

      const matchingFII = response.result.find((fii: any) => {
        const fiiName = (fii.nomeFII || "").trim();
        return fiiName === normalizedSearchName;
      });

      if (!matchingFII) {
        return null;
      }

      const fii = matchingFII;

      const codigo = Array.isArray(fii.codigo)
        ? fii.codigo
        : fii.codigo
        ? [fii.codigo]
        : [];

      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || "",
        dataInicio: fii.quotaDateApproved || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };

      return extendedFII;
    }
  } catch (error) {
    console.error("Erro ao buscar FII específico:", error);
    throw new Error(
      "Não foi possível carregar os detalhes do FII. Tente novamente mais tarde."
    );
  }
};

export const getAllFIIs = async (): Promise<FIIExtended[]> => {
  try {
    const response = await api.fiis.getAllFIIs();

    if (!response || !response.result || !Array.isArray(response.result)) {
      console.error("Unexpected API response structure:", response);
      return [];
    }

    // Map the response to FIIExtended format
    const mappedFIIs = response.result.map((fii: any) => {
      const codigo = Array.isArray(fii.codigo)
        ? fii.codigo
        : fii.codigo
        ? [fii.codigo]
        : [];

      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || "",
        dataInicio: fii.quotaDateApproved || "",
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      };
      return extendedFII;
    });

    return mappedFIIs;
  } catch (error) {
    console.error("Erro ao buscar todas as FIIs:", error);
    return [];
  }
};
