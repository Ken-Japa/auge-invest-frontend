import { useEffect, useState } from 'react'

import { fetchFIIBySlugOrCode } from '../../../../components/FIIs/services/fiisService'
import { FIIExtended } from '../../../../components/FIIs/types'

interface UseFIIDetailsProps {
  slug: string
  codigo?: string
  isCode?: boolean
}

interface UseFIIDetailsResult {
  fii: FIIExtended | null
  loading: boolean
  error: string | null
}

export const useFIIDetails = ({ slug, codigo, isCode = false }: UseFIIDetailsProps): UseFIIDetailsResult => {
  const [fii, setFII] = useState<FIIExtended | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFII = async () => {
      try {
        setLoading(true)
        setError(null)

        const searchParam = codigo || slug

        const isFIICode = /^[A-Z]{4}11$/.test(searchParam.toUpperCase())

        let result: FIIExtended | null
        if (isFIICode) {
          result = await fetchFIIBySlugOrCode(searchParam, true)
        } else {
          result = await fetchFIIBySlugOrCode(searchParam, false)

          if (!result) {
            result = await fetchFIIBySlugOrCode(searchParam, true)
          }
        }

        if (!result) {
          console.error('FII não encontrado:', searchParam)
          setError('FII não encontrado')
          return
        }

        setFII(result)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido'
        console.error('Erro ao carregar FII:', errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadFII()
  }, [slug, codigo, isCode])

  return { fii, loading, error }
}
