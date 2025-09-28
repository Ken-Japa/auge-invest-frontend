import { sumarioApi } from "@/services/api/endpoints/sumario";

import { Industria, SumarioData, SumarioTotal } from "../TabelaView/types";

/**
 * Busca dados da API e calcula o sumarioTotal
 */
const fetchApiData = async (): Promise<SumarioData> => {
  const sumarioResponse = await sumarioApi.getSumarioItems({
    pageSize: 100,
  });

  const sumario: Industria[] = sumarioResponse.result;

  let valorMercadoTotalGeral = 0;
  const industriasSet = new Set<string>();
  let qtdEmpresasTotal = 0;
  let qtdSegmentosTotal = 0;

  sumario.forEach((industria) => {
    valorMercadoTotalGeral += industria.valorMercadoTotal;
    industriasSet.add(industria.industria);
    industria.segmentos.forEach((segmento) => {
      qtdSegmentosTotal++;
      qtdEmpresasTotal += segmento.empresasDetalhes.length;
    });
  });

  const sumarioTotal: SumarioTotal = {
    valorMercadoTotalGeral,
    qtdIndustriasTotal: industriasSet.size,
    qtdEmpresasTotal,
    qtdSegmentosTotal,
    industrias: Array.from(industriasSet),
  };

  return {
    sumario,
    sumarioTotal,
  };
};

export const sumarioService = {
  getSumarioData: fetchApiData,
};
