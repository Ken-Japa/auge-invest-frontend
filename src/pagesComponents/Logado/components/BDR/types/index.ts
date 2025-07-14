import { BDR } from "@/services/api/types";

export interface BDRCode {
  codigo: string;
  preco: number | null;
  precoAnterior: number | null;
  variacao: number | null;
}

export interface BDRExtended extends BDR {
  nomeCompleto?: string;
  dataInicio?: string;
  codigos?: BDRCode[];
}

export interface BDRFilter {
  segmento?: string;
  nome?: string;
  page?: number;
  pageSize?: number;
  codigo?: string;
}

export type VisualizationMode = "card" | "table" | "grid";
