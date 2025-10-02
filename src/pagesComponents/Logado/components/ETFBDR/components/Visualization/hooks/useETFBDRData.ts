import { useEffect, useState } from 'react'

import { ETFBDRFilter } from '@/services/api/types/etfbdr'

import { fetchETFBDRs } from '../../../services/etfbdrService'
import { ETFBDRExtended } from '../../../types'

interface UseETFBDRDataProps {
  filters: ETFBDRFilter
  initialPageSize: number
}

interface UseETFBDRDataResult {
  etfbdrs: ETFBDRExtended[]
  loading: boolean
  error: string | null
  page: number
  totalPages: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export const useETFBDRData = ({ filters, initialPageSize }: UseETFBDRDataProps): UseETFBDRDataResult => {
  const [etfbdrs, setETFBDRs] = useState<ETFBDRExtended[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)

  useEffect(() => {
    const loadETFBDRs = async () => {
      try {
        setLoading(true)
        setError(null)

        const result = await fetchETFBDRs({
          ...filters,
          page,
          pageSize,
        })

        setETFBDRs(result.result)
        setTotalPages(result.pagination.pages)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadETFBDRs()
  }, [filters, page, pageSize])

  return {
    etfbdrs,
    loading,
    error,
    page,
    totalPages,
    pageSize,
    setPage,
    setPageSize,
  }
}
