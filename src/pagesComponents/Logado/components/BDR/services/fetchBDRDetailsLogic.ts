import { api } from "@/services/api";
import {
  BDRExtended,
  BDRNPExtended,
  UnifiedBDR,
  BDRType,
} from "../types";

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
              nomeEmpresa: bdr.nomeEmpresa || "",
              dataInicio: bdr.dataInicio || "",
              codigo: bdr.codigo || "",
              isPatrocinado: true,
            };

            return extendedBDR;
          }
        } else {
          // Busca por nome em BDRs patrocinados
          const response = await api.bdrs.searchBDRs(
            decodedSlug,
            "nomeEmpresa"
          );

          if (response && response.result && Array.isArray(response.result)) {
            const normalizedSearchName = decodedSlug.trim();

            const matchingBDR = response.result.find((bdr: any) => {
              const bdrName = (bdr.nomeEmpresa || "").trim();
              return (
                bdrName.toLowerCase() === normalizedSearchName.toLowerCase()
              );
            });

            if (matchingBDR) {
              const codigo = matchingBDR.codigo
                ? [{ codigo: matchingBDR.codigo }]
                : [];

              const extendedBDR: BDRExtended = {
                ...matchingBDR,
                nomeEmpresa: matchingBDR.nomeEmpresa || "",
                dataInicio: matchingBDR.dataInicio || "",
                codigo: matchingBDR.codigo || "",
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
              nomeEmpresa: bdrnp.nomeEmpresa || "",
              dataInicio: bdrnp.dataInicio || "",
              codigo: bdrnp.codigo || "",
              isPatrocinado: false,
            };

            return extendedBDRNP;
          }
        } else {
          // Busca por nome em BDRs não patrocinados
          const response = await api.bdrnp.searchBDRNPs(
            decodedSlug,
            "nomeEmpresa"
          );

          if (response && response.result && Array.isArray(response.result)) {
            const normalizedSearchName = decodedSlug.trim();

            const matchingBDRNP = response.result.find((bdrnp: any) => {
              const bdrnpName = (bdrnp.nomeEmpresa || "").trim();
              return (
                bdrnpName.toLowerCase() === normalizedSearchName.toLowerCase()
              );
            });

            if (matchingBDRNP) {
              const codigo = matchingBDRNP.codigo
                ? [{ codigo: matchingBDRNP.codigo }]
                : [];

              const extendedBDRNP: BDRNPExtended = {
                ...matchingBDRNP,
                nomeEmpresa: matchingBDRNP.nomeEmpresa || "",
                dataInicio: matchingBDRNP.dataInicio || "",
                codigo: matchingBDRNP.codigo,
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

export const getAllBDRs = async (
  bdrType: BDRType = "todos"
): Promise<UnifiedBDR[]> => {
  try {
    let patrocinados: BDRExtended[] = [];
    let naoPatrocinados: BDRNPExtended[] = [];

    // Busca BDRs patrocinados se necessário
    if (bdrType === "patrocinado" || bdrType === "todos") {
      try {
        const responsePatrocinados = await api.bdrs.getAllBDRs();

        if (
          responsePatrocinados &&
          responsePatrocinados.result &&
          Array.isArray(responsePatrocinados.result)
        ) {
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
                codigo: typeof code === "string" ? code : code.codigo,
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

        if (
          responseNaoPatrocinados &&
          responseNaoPatrocinados.result &&
          Array.isArray(responseNaoPatrocinados.result)
        ) {
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
                codigo: typeof code === "string" ? code : code.codigo,
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