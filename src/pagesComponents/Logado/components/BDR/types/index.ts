import { BDR, BDRNP } from '@/services/api/types'

export interface BDRCode {
  codigo: string
  preco?: number | null
  precoAnterior?: number | null
  variacao?: number | null
}

export interface BDRExtended extends BDR {
  isPatrocinado?: boolean
  codigos?: BDRCode[]
}

export interface BDRNPExtended extends BDRNP {
  isPatrocinado?: boolean
  codigos?: BDRCode[]
}

// Tipo unificado para representar tanto BDRs patrocinados quanto não patrocinados
export type UnifiedBDR = BDRExtended | BDRNPExtended

export interface VisualizacaoBDRsProps {
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

export interface BDRFilter {
  segmento?: string
  nomeEmpresa?: string
  page?: number
  pageSize?: number
  codigo?: string
  isPatrocinado?: boolean
}

export type VisualizationMode = 'card' | 'table' | 'grid'

export type BDRType = 'patrocinado' | 'nao-patrocinado' | 'todos'

export interface BDRFilterControlsProps {
  bdrType: BDRType
  handleBDRTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface BDRVisualizationRendererProps {
  mode: VisualizationMode
  bdrs: UnifiedBDR[]
}

export interface UseBDRsProps {
  filter?: {
    segmento?: string
    nome?: string
    isPatrocinado?: boolean
    searchQuery?: string
  }
  onError?: (message: string) => void
  defaultPageSize?: number
}
