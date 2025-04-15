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
    if (isCode) {
      const searchParam: FIIFilter = {
        codigo: slugOrCode.trim().toUpperCase(),
      };

      const response = await api.fiis.getFIIs(searchParam);

      if (
        !response ||
        !response.result ||
        !Array.isArray(response.result) ||
        response.result.length === 0
      ) {
        console.error("FII não encontrado pelo código:", slugOrCode);
        return null;
      }

      const fii = response.result[0];

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
      const response = await api.fiis.getFIIs({ pageSize: 100 });

      if (!response || !response.result || !Array.isArray(response.result)) {
        console.error("Failed to fetch FIIs list");
        throw new Error("Falha ao buscar lista de FIIs");
      }

      let normalizedSearchName = slugOrCode
        .trim()
        .replace(/^FII[\s_]+/i, "")
        .replace(/_/g, " ")
        .toUpperCase();

      const matchingFIIs = response.result.filter((fii: any) => {
        const fiiName = (fii.nomeFII || "").toUpperCase();
        return (
          fiiName.includes(normalizedSearchName) ||
          (normalizedSearchName.includes(fiiName) && fiiName.length > 3)
        );
      });

      if (matchingFIIs.length === 0) {
        console.error("FII não encontrado pelo nome:", slugOrCode);
        return null;
      }

      const fii = matchingFIIs[0];

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
