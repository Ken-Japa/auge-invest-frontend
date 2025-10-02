import { useEffect, useState } from 'react'

import { api } from '@/services/api'

interface DerivativoItem {
  'COD Opcao': string
  'Call ou Put': string
  Tipo: string
  'ON ou PN': string
  Strike: string
  Vencimento: string
  'Ultimo Preco': number
  'Data Negocio': string | null
  'Hora Negocio': string
  'Oferta Compra': number
  'Oferta Venda': number
  Volume: number
  Contratos: number
  _id: string
}

interface DerivativosResponse {
  success?: boolean
  data?: {
    _id: string
    Empresa: string
    'COD Empresa': string
    totalDerivativos: number
    Derivativos: DerivativoItem[]
    pagination: {
      offset: number
      limit: number
      total: number
      page: number
      pages: number
    }
  }
  _id?: string
  Empresa?: string
  'COD Empresa'?: string
  totalDerivativos?: number
  Derivativos?: DerivativoItem[]
  pagination?: {
    offset: number
    limit: number
    total: number
    page: number
    pages: number
  }
}

interface UseDerivativosDataResult {
  loading: boolean
  error: string | null
  derivativos: DerivativoItem[]
  totalDerivativos: number
  hasDerivatives: boolean
  allDerivativesLoaded: boolean
}

/**
 * Hook personalizado para buscar dados de derivativos.
 * @param codigoBase O código base da empresa para buscar os derivativos.
 * @returns Um objeto contendo o estado de carregamento, erro, derivativos, total de derivativos, se há derivativos e se todos foram carregados.
 */
export const useDerivativosData = (codigoBase: string): UseDerivativosDataResult => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [derivativos, setDerivativos] = useState<DerivativoItem[]>([])
  const [totalDerivativos, setTotalDerivativos] = useState(0)
  const [hasDerivatives, setHasDerivatives] = useState(true)
  const [allDerivativesLoaded, setAllDerivativesLoaded] = useState(false)

  useEffect(() => {
    const fetchAllDerivativos = async () => {
      if (!codigoBase) {
        setError('Código de ativo não fornecido')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // First, get the total count
        const initialResponse: DerivativosResponse = await api.derivatives.getDerivatives({
          cod_empresa: codigoBase,
          page: 0,
          pageSize: 10,
        })

        let totalCount = 0
        if (initialResponse.totalDerivativos) {
          totalCount = initialResponse.totalDerivativos
        } else if (initialResponse.data?.totalDerivativos) {
          totalCount = initialResponse.data.totalDerivativos
        }

        if (totalCount === 0) {
          setHasDerivatives(false)
          setLoading(false)
          return
        }

        // Now fetch all derivatives in one request with a large page size
        const response: DerivativosResponse = await api.derivatives.getDerivatives({
          cod_empresa: codigoBase,
          page: 0,
          pageSize: totalCount, // Get all at once
        })

        if (response.Derivativos && Array.isArray(response.Derivativos)) {
          setDerivativos(response.Derivativos)
          setTotalDerivativos(response.Derivativos.length)
          setHasDerivatives(response.Derivativos.length > 0)
        } else if (response.success && response.data) {
          setDerivativos(response.data.Derivativos || [])
          setTotalDerivativos(response.data.Derivativos.length)
          setHasDerivatives(response.data.Derivativos.length > 0)
        } else {
          setHasDerivatives(false)
          setError('Dados de derivativos não disponíveis')
        }

        setAllDerivativesLoaded(true)
      } catch (err) {
        console.error('Erro ao buscar derivativos:', err)
        setHasDerivatives(false)
        setError('Não foi possível carregar os dados de derivativos. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchAllDerivativos()
  }, [codigoBase])

  return {
    loading,
    error,
    derivativos,
    totalDerivativos,
    hasDerivatives,
    allDerivativesLoaded,
  }
}
