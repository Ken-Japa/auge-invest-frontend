import { api } from "@/services/api";
import { BDRFilter, BDRExtended, BDRNPExtended, UnifiedBDR, BDRType } from "../types";
import { BDR, BDRNP } from "@/services/api/types";

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

    // Determina se devemos buscar BDRs patrocinados, não patrocinados ou ambos
    const bdrType: BDRType = filter.isPatrocinado === undefined ? "todos" :
                            filter.isPatrocinado ? "patrocinado" : "nao-patrocinado";

    let patrocinados: BDRExtended[] = [];
    let naoPatrocinados: BDRNPExtended[] = [];
    let paginationPatrocinados = {
      offset: 0,
      limit: pageSize,
      total: 0,
      page: filter.page !== undefined ? filter.page + 1 : 1,
      pages: 1,
    };
    let paginationNaoPatrocinados = { ...paginationPatrocinados };

    // Busca BDRs patrocinados se necessário
    if (bdrType === "patrocinado" || bdrType === "todos") {
      const responsePatrocinados = await api.bdrs.getBDRs({
        segmento: filter.segmento,
        nomeEmpresa: filter.nomeEmpresa,
        page: filter.page !== undefined ? filter.page : 0,
        pageSize,
      });

      if (responsePatrocinados && responsePatrocinados.result && Array.isArray(responsePatrocinados.result)) {
        patrocinados = responsePatrocinados.result.map((bdr: BDR) => {
          const codigo = bdr.codigo ? [{ codigo: bdr.codigo }] : [];

          const extendedBDR: BDRExtended = {
            ...bdr,
            nomeCompleto: bdr.nomeEmpresaCompleto || "",
            dataInicio: bdr.dataInicio || "",
            codigos: codigo.map((code: any) => ({
              codigo: typeof code === 'string' ? code : code.codigo,
              preco: null,
              precoAnterior: null,
              variacao: null,
            })),
            isPatrocinado: true,
          };
          return extendedBDR;
        });

        paginationPatrocinados = responsePatrocinados.pagination || {
          offset: 0,
          limit: pageSize,
          total: patrocinados.length,
          page: filter.page !== undefined ? filter.page + 1 : 1,
          pages: Math.ceil(patrocinados.length / pageSize) || 1,
        };
      }
    }

    // Busca BDRs não patrocinados se necessário
    if (bdrType === "nao-patrocinado" || bdrType === "todos") {
      const responseNaoPatrocinados = await api.bdrnp.getBDRNPs({
        segmento: filter.segmento,
        nomeEmpresa: filter.nomeEmpresa,
        page: filter.page !== undefined ? filter.page : 0,
        pageSize,
      });

      if (responseNaoPatrocinados && responseNaoPatrocinados.result && Array.isArray(responseNaoPatrocinados.result)) {
        naoPatrocinados = responseNaoPatrocinados.result.map((bdrnp: BDRNP) => {
          const codigo = bdrnp.codigo ? [{ codigo: bdrnp.codigo }] : [];

          const extendedBDRNP: BDRNPExtended = {
            ...bdrnp,
            nomeCompleto: bdrnp.nomeEmpresaCompleto || "",
            dataInicio: bdrnp.dataInicio || "",
            codigos: codigo.map((code: any) => ({
              codigo: typeof code === 'string' ? code : code.codigo,
              preco: null,
              precoAnterior: null,
              variacao: null,
            })),
            isPatrocinado: false,
          };
          return extendedBDRNP;
        });

        paginationNaoPatrocinados = responseNaoPatrocinados.pagination || {
          offset: 0,
          limit: pageSize,
          total: naoPatrocinados.length,
          page: filter.page !== undefined ? filter.page + 1 : 1,
          pages: Math.ceil(naoPatrocinados.length / pageSize) || 1,
        };
      }
    }

    // Combina os resultados
    const combinedBDRs: UnifiedBDR[] = [...patrocinados, ...naoPatrocinados];

    // Calcula a paginação combinada
    const combinedPagination = {
      offset: 0,
      limit: pageSize,
      total: (bdrType === "todos" ? 
              paginationPatrocinados.total + paginationNaoPatrocinados.total : 
              bdrType === "patrocinado" ? paginationPatrocinados.total : paginationNaoPatrocinados.total),
      page: filter.page !== undefined ? filter.page + 1 : 1,
      pages: Math.max(
        bdrType === "todos" ? 
          Math.max(paginationPatrocinados.pages, paginationNaoPatrocinados.pages) : 
          bdrType === "patrocinado" ? paginationPatrocinados.pages : paginationNaoPatrocinados.pages,
        1
      ),
    };

    return {
      bdrs: combinedBDRs,
      pagination: combinedPagination,
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
  isCode: boolean = false,
  bdrType: BDRType = "todos"
): Promise<UnifiedBDR | null> => {
  try {
    const decodedSlug = decodeURIComponent(slugOrCode);
    const upperCode = decodedSlug.trim().toUpperCase();
    const isCodeSearch = isCode || /^[A-Z]{4}11$/.test(upperCode);

    // Busca em BDRs patrocinados
    if (bdrType === "patrocinado" || bdrType === "todos") {
      try {
        // Se estamos buscando por código
        if (isCodeSearch) {
          const bdr = await api.bdrs.getBDRByCode(upperCode);

          if (bdr) {
            const codigo = bdr.codigo ? [{ codigo: bdr.codigo }] : [];

            const extendedBDR: BDRExtended = {
              ...bdr,
              nomeCompleto: bdr.nomeEmpresaCompleto || "",
              dataInicio: bdr.dataInicio || "",
              codigos: codigo.map((code: any) => ({
                codigo: typeof code === 'string' ? code : code.codigo,
                preco: null,
                precoAnterior: null,
                variacao: null,
              })),
              isPatrocinado: true,
            };

            return extendedBDR;
          }
        } else {
          // Busca por nome em BDRs patrocinados
          const response = await api.bdrs.getBDRs({ pageSize: 100 });

          if (response && response.result && Array.isArray(response.result)) {
            const normalizedSearchName = decodedSlug.trim();

            const matchingBDR = response.result.find((bdr: any) => {
              const bdrName = (bdr.nomeEmpresa || "").trim();
              return bdrName.toLowerCase() === normalizedSearchName.toLowerCase();
            });

            if (matchingBDR) {
              const codigo = matchingBDR.codigo ? [{ codigo: matchingBDR.codigo }] : [];

              const extendedBDR: BDRExtended = {
                ...matchingBDR,
                nomeCompleto: matchingBDR.nomeEmpresaCompleto || "",
                dataInicio: matchingBDR.dataInicio || "",
                codigos: codigo.map((code: any) => ({
                  codigo: typeof code === 'string' ? code : code.codigo,
                  preco: null,
                  precoAnterior: null,
                  variacao: null,
                })),
                isPatrocinado: true,
              };

              return extendedBDR;
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar BDR patrocinado:", error);
        // Continua para tentar buscar em BDRs não patrocinados
      }
    }

    // Busca em BDRs não patrocinados
    if (bdrType === "nao-patrocinado" || bdrType === "todos") {
      try {
        // Se estamos buscando por código
        if (isCodeSearch) {
          const bdrnp = await api.bdrnp.getBDRNPByCode(upperCode);

          if (bdrnp) {
            const codigo = bdrnp.codigo ? [{ codigo: bdrnp.codigo }] : [];

            const extendedBDRNP: BDRNPExtended = {
              ...bdrnp,
              nomeCompleto: bdrnp.nomeEmpresaCompleto || "",
              dataInicio: bdrnp.dataInicio || "",
              codigos: codigo.map((code: any) => ({
                codigo: typeof code === 'string' ? code : code.codigo,
                preco: null,
                precoAnterior: null,
                variacao: null,
              })),
              isPatrocinado: false,
            };

            return extendedBDRNP;
          }
        } else {
          // Busca por nome em BDRs não patrocinados
          const response = await api.bdrnp.getBDRNPs({ pageSize: 100 });

          if (response && response.result && Array.isArray(response.result)) {
            const normalizedSearchName = decodedSlug.trim();

            const matchingBDRNP = response.result.find((bdrnp: any) => {
              const bdrnpName = (bdrnp.nomeEmpresa || "").trim();
              return bdrnpName.toLowerCase() === normalizedSearchName.toLowerCase();
            });

            if (matchingBDRNP) {
              const codigo = matchingBDRNP.codigo ? [{ codigo: matchingBDRNP.codigo }] : [];

              const extendedBDRNP: BDRNPExtended = {
                ...matchingBDRNP,
                nomeCompleto: matchingBDRNP.nomeEmpresaCompleto || "",
                dataInicio: matchingBDRNP.dataInicio || "",
                codigos: codigo.map((code: any) => ({
                  codigo: typeof code === 'string' ? code : code.codigo,
                  preco: null,
                  precoAnterior: null,
                  variacao: null,
                })),
                isPatrocinado: false,
              };

              return extendedBDRNP;
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar BDR não patrocinado:", error);
      }
    }

    // Se chegou aqui, não encontrou em nenhum dos tipos
    return null;
  } catch (error) {
    console.error("Erro ao buscar BDR específico:", error);
    throw new Error(
      "Não foi possível carregar os detalhes do BDR. Tente novamente mais tarde."
    );
  }
};

export const getAllBDRs = async (bdrType: BDRType = "todos"): Promise<UnifiedBDR[]> => {
  try {
    let patrocinados: BDRExtended[] = [];
    let naoPatrocinados: BDRNPExtended[] = [];

    // Busca BDRs patrocinados se necessário
    if (bdrType === "patrocinado" || bdrType === "todos") {
      try {
        const responsePatrocinados = await api.bdrs.getAllBDRs();

        if (responsePatrocinados && responsePatrocinados.result && Array.isArray(responsePatrocinados.result)) {
          patrocinados = responsePatrocinados.result.map((bdr: any) => {
            const codigo = Array.isArray(bdr.codigo)
              ? bdr.codigo
              : bdr.codigo
              ? [bdr.codigo]
              : [];

            const extendedBDR: BDRExtended = {
              ...bdr,
              nomeCompleto: bdr.nomeEmpresaCompleto || "",
              dataInicio: bdr.dataInicio || "",
              codigos: codigo.map((code: any) => ({
                codigo: typeof code === 'string' ? code : code.codigo,
                preco: null,
                precoAnterior: null,
                variacao: null,
              })),
              isPatrocinado: true,
            };
            return extendedBDR;
          });
        }
      } catch (error) {
        console.error("Erro ao buscar todas as BDRs patrocinadas:", error);
      }
    }

    // Busca BDRs não patrocinados se necessário
    if (bdrType === "nao-patrocinado" || bdrType === "todos") {
      try {
        const responseNaoPatrocinados = await api.bdrnp.getAllBDRNPs();

        if (responseNaoPatrocinados && responseNaoPatrocinados.result && Array.isArray(responseNaoPatrocinados.result)) {
          naoPatrocinados = responseNaoPatrocinados.result.map((bdrnp: any) => {
            const codigo = Array.isArray(bdrnp.codigo)
              ? bdrnp.codigo
              : bdrnp.codigo
              ? [bdrnp.codigo]
              : [];

            const extendedBDRNP: BDRNPExtended = {
              ...bdrnp,
              nomeCompleto: bdrnp.nomeEmpresaCompleto || "",
              dataInicio: bdrnp.dataInicio || "",
              codigos: codigo.map((code: any) => ({
                codigo: typeof code === 'string' ? code : code.codigo,
                preco: null,
                precoAnterior: null,
                variacao: null,
              })),
              isPatrocinado: false,
            };
            return extendedBDRNP;
          });
        }
      } catch (error) {
        console.error("Erro ao buscar todas as BDRs não patrocinadas:", error);
      }
    }

    // Combina os resultados
    return [...patrocinados, ...naoPatrocinados];
  } catch (error) {
    console.error("Erro ao buscar todas as BDRs:", error);
    return [];
  }
};
