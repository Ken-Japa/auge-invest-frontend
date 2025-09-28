import { EmpresaDetalhe,Industria, Segmento, SumarioData as TabelaViewSumarioData } from "../../TabelaView/types";
import { EmpresaNode,IndustriaNode, SegmentoNode, SumarioData as RedeNeuralSumarioData } from "../types";

export const transformSumarioData = (data: TabelaViewSumarioData): RedeNeuralSumarioData => {
  const totalValorMercadoGeral = data.sumarioTotal.valorMercadoTotalGeral;

  const transformedIndustrias: IndustriaNode[] = data.sumario.map((industria: Industria) => {
    const transformedSegmentos: SegmentoNode[] = industria.segmentos.map((segmento: Segmento) => {
      const transformedEmpresas: EmpresaNode[] = segmento.empresasDetalhes.map((empresa: EmpresaDetalhe) => ({
        empresa: empresa.empresa,
        valorMercado: empresa.valorMercado,
        participacao: (empresa.valorMercado / segmento.valorMercado) * 100, // Calculate participation
        codigos: empresa.codigos,
      }));

      return {
        segmento: segmento.segmento,
        valorMercado: segmento.valorMercado,
        empresas: segmento.empresasDetalhes.length,
        participacao: (segmento.valorMercado / industria.valorMercadoTotal) * 100, // Calculate participation
        empresasDetalhes: transformedEmpresas,
      };
    });

    return {
      industria: industria.industria,
      valorMercadoTotal: industria.valorMercadoTotal,
      participacao: (industria.valorMercadoTotal / totalValorMercadoGeral) * 100, // Calculate participation
      qtdSegmentos: industria.segmentos.length,
      empresas: industria.segmentos.reduce((acc, seg) => acc + seg.empresasDetalhes.length, 0),
      segmentos: transformedSegmentos,
    };
  });

  return {
    sumario: transformedIndustrias,
    sumarioTotal: data.sumarioTotal,
  };
};