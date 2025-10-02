// Common API response types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiSuccessResponse<T> {
  success: boolean
  data: T
}

export interface Pagination {
  offset: number
  limit: number
  total: number
  page: number
  pages: number
}
