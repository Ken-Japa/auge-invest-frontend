import { FII } from '@/services/api/types'

export interface FIICode {
  codigo: string
  preco: number | null
  precoAnterior: number | null
  variacao: number | null
}

export interface FIIExtended extends FII {
  nomeCompleto?: string
  dataInicio?: string
  codigos?: FIICode[]
}

export interface FIIFilter {
  segmento?: string
  nome?: string
  page?: number
  pageSize?: number
  codigo?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface VisualizacaoFIIsProps {
  mode?: VisualizationMode
  filter?: {
    segmento?: string
    nome?: string
    isPatrocinado?: boolean
    searchQuery?: string
  }
  onError?: (message: string) => void
  defaultPageSize?: number
}

export type VisualizationMode = 'card' | 'table' | 'grid'
