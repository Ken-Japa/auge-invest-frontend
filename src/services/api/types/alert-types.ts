import { Pagination } from './common'

export interface Alert {
  _id?: string
  type: 'buy' | 'sell'
  asset: string
  targetPrice: number
  currentPrice?: number
  percentageDistance: number
  notificationMethods: string[]
  expiresAt?: string
  recurring?: boolean
  userId: string
  comments?: string
  triggered?: boolean
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export interface AlertFilter {
  page?: number
  pageSize?: number
}

export interface AlertListResponseApi {
  result: Alert[]
  pagination: Pagination
}
