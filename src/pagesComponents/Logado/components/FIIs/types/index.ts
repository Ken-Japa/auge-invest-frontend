import { FII } from '@/services/api/types';

// Types for future API response format
export interface FIICode {
  codigo: string;
  preco: number | null;
  precoAnterior: number | null;
  variacao: number | null;
}

export interface FIIExtended extends FII {
  // Fields for future API response
  nomeCompleto?: string;
  dataInicio?: string;
  codigos?: FIICode[];
}

export interface FIIFilter {
  segmento?: string;
  nome?: string;
  page?: number;
  pageSize?: number;
}

export type VisualizationMode = 'card' | 'table' | 'grid';