import { Pagination } from './common'

// Interface for historical data item
export interface HistoricalDataItem {
  data: string
  preco: number
  volume: number
}

// Interface for historical data response
export interface HistoricalDataResponse {
  success: boolean
  data: {
    _id: string
    empresa: string
    codigo: string
    totalHistoric: number
    historic: HistoricalDataItem[]
    pagination: Pagination
  }
}

// Interface for historical data filters
export interface HistoricalDataFilter {
  codigo: string
  page?: number
  pageSize?: number
  startDate?: string
  endDate?: string
}
