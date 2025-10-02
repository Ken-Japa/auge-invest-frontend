import { Pagination } from './common'

export interface ETFBDR {
  _id: string
  nomeCompletoETF: string
  nomeETF: string
  codigoETF: string
  codigo: string
  codigoCVM: string
  industria: string | null
  segmento: string | null
  atividade: string | null
  __v?: number
  informações: ETFBDRInformation
}

export interface ETFBDRListResponse {
  result: ETFBDR[]
  pagination: Pagination
}

export interface ETFBDRFilter {
  nomeETF?: string
  codigoETF?: string
  industria?: string
  segmento?: string
  atividade?: string
  page?: number
  pageSize?: number
  nome?: string
  codigo?: string
}

export interface ETFBDRInformation {
  status: string
  marketIndicator: string
  dataInicio: string
  tipo: string
}
