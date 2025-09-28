import { createEmpresaNode } from "../components/EmpresaNode";
import { createIndustriaNode } from "../components/IndustriaNode";
import { createSegmentoNode } from "../components/SegmentoNode";
import { CORES_INDUSTRIAS } from "../constants/colors";
import {
  EmpresaNode,
  IndustriaNode,
  SegmentoNode,
  SumarioData,
} from "../types";
import { adjustColorHSL } from "./graphUtils";

export const generateSegmentColors = (
  baseColor: string,
  count: number
): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(
      adjustColorHSL(baseColor, {
        h: i * 5 - 2,
        s: 0.05,
        l: -0.01 + i * 0.02,
      })
    );
  }
  return colors;
};

interface BuildGraphDataParams {
  data: SumarioData;
  nodes: any[];
  edges: any[];
  maxIndustriaValue: number;
  maxSegmentoValue: number;
  maxEmpresaValue: number;
  valorMercadoTotalGeral: number;
}

import { createCentralNode } from "../components/CentralNode";

export const buildGraphData = ({
  data,
  nodes,
  edges,
  maxIndustriaValue,
  maxSegmentoValue,
  maxEmpresaValue,
  valorMercadoTotalGeral,
}: BuildGraphDataParams) => {
  // Central node
  nodes.push(createCentralNode(valorMercadoTotalGeral));
  // Industry nodes - First level
  const industriaRadius = 14000;
  data.sumario.forEach(
    (industria: IndustriaNode, index: number, array: IndustriaNode[]) => {
      const industriaAngle = (2 * Math.PI * index) / array.length;
      const industriaSector = (2 * Math.PI) / array.length;
      const corIndustria = adjustColorHSL(
        CORES_INDUSTRIAS[index % CORES_INDUSTRIAS.length],
        {
          s: 0.15,
          l: 0.05,
        }
      );

      const industriaNode = createIndustriaNode(
        industria,
        index,
        array,
        maxIndustriaValue,
        corIndustria,
        industriaRadius
      );
      nodes.push(industriaNode);

      edges.push({
        from: "Mercado Total",
        to: industriaNode.id,
        color: { color: corIndustria, opacity: 0.9, highlight: "#FFFFFF" },
        width: 18,
        smooth: { enabled: true, type: "curvedCW", roundness: 0.1 },
        physics: false,
      });

      // Segment nodes - Second level
      const segmentRadius = industriaRadius + 12000;
      const segmentColors = generateSegmentColors(
        corIndustria,
        industria.segmentos.length
      );

      industria.segmentos.forEach(
        (
          segmento: SegmentoNode,
          segIndex: number,
          segArray: SegmentoNode[]
        ) => {
          const segmentoNode = createSegmentoNode(
            segmento,
            segIndex,
            segArray,
            maxSegmentoValue,
            segmentColors[segIndex],
            segmentRadius,
            industriaAngle,
            industriaSector
          );
          nodes.push(segmentoNode);

          edges.push({
            from: industriaNode.id,
            to: segmentoNode.id,
            color: {
              color: segmentColors[segIndex],
              opacity: 0.5,
              highlight: "#FFFFFF",
            },
            width: 8,
          });

          // Company nodes - Third level
          const empresaRadius = segmentRadius + 6000;
          const maxValorMercadoSegmento = Math.max(
            ...segmento.empresasDetalhes.map((emp) => emp.valorMercado)
          );

          segmento.empresasDetalhes.forEach(
            (
              empresa: EmpresaNode,
              empIndex: number,
              empArray: EmpresaNode[]
            ) => {
              const empresaNode = createEmpresaNode(
                empresa,
                empIndex,
                empArray,
                maxValorMercadoSegmento,
                segmentColors[segIndex],
                empresaRadius,
                industriaAngle,
                industriaSector / segArray.length
              );
              nodes.push(empresaNode);

              edges.push({
                from: segmentoNode.id,
                to: empresaNode.id,
                color: {
                  color: empresaNode.color.background,
                  opacity: 0.4,
                  highlight: "#FFFFFF",
                },
                width: 3,
              });
            }
          );
        }
      );
    }
  );
};
