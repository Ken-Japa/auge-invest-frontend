import { Pagination } from './common'

export interface Sumario {
  industria: string
  valorMercadoTotal: number
  participacao: number
  qtdSegmentos: number
  empresas: number
  totalSegmentos: number
  segmentos: SegmentosSumario[]
}

export interface SegmentosSumario {
  segmento: string
  valorMercado: number
  empresas: number
  participacao: number
  empresasDetalhes: EmpresasSumario[]
}

export interface EmpresasSumario {
  empresa: string
  valorMercado: number
  participacao: number
  codigos: CodigosSumario[]
}

export interface CodigosSumario {
  codigo: string
  preco: number
  variacao: number
}

export interface SumarioListResponseApi {
  result: Sumario[]
  pagination: Pagination
}

export interface SumarioFilter {
  page?: number
  pageSize?: number
  name?: string
}
