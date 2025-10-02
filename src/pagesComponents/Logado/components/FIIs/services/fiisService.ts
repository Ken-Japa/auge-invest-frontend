import { api } from '@/services/api'
import { FIIListResponse } from '@/services/api/types/fii'

import { FIIExtended, FIIFilter } from '../types'

export const fetchFIIs = async (filters: FIIFilter): Promise<FIIListResponse> => {
  try {
    const { page, pageSize, ...restFilters } = filters // Extrai page e pageSize
    const response = await api.fiis.getFIIs({
      ...restFilters, // Usa o restante dos filtros
      sortBy: filters.sortBy || 'quotaCount',
      sortOrder: filters.sortOrder || 'desc',
    })
    return response
  } catch (error) {
    console.error('Erro ao buscar FIIs:', error)

    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    } else {
      console.error('Unknown error type:', error)
    }

    throw new Error('Não foi possível carregar os FIIs. Tente novamente mais tarde.')
  }
}

export const fetchFIIBySlugOrCode = async (
  slugOrCode: string,
  isCode = false,
): Promise<FIIExtended | null> => {
  try {
    const decodedSlug = decodeURIComponent(slugOrCode)

    // Se estamos buscando por código (XXXX11)
    if (isCode || /^[A-Z]{4}11$/.test(decodedSlug.toUpperCase())) {
      const upperCode = decodedSlug.trim().toUpperCase()

      const fii = await api.fiis.getFIIByCode(upperCode)

      if (!fii) {
        return null
      }

      const codigo = Array.isArray(fii.codigo) ? fii.codigo : fii.codigo ? [fii.codigo] : []

      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || '',
        dataInicio: fii.quotaDateApproved || '',
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      }

      return extendedFII
    } else {
      // Busca por nome
      const response = await api.fiis.getFIIs({ pageSize: 100 })

      if (!response || !response.result || !Array.isArray(response.result)) {
        throw new Error('Falha ao buscar lista de FIIs')
      }

      const normalizedSearchName = decodedSlug.trim()

      const matchingFII = response.result.find((fii: any) => {
        const fiiName = (fii.nomeFII || '').trim()
        return fiiName === normalizedSearchName
      })

      if (!matchingFII) {
        return null
      }

      const fii = matchingFII

      const codigo = Array.isArray(fii.codigo) ? fii.codigo : fii.codigo ? [fii.codigo] : []

      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || '',
        dataInicio: fii.quotaDateApproved || '',
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      }

      return extendedFII
    }
  } catch (error) {
    console.error('Erro ao buscar FII específico:', error)
    throw new Error('Não foi possível carregar os detalhes do FII. Tente novamente mais tarde.')
  }
}

export const getAllFIIs = async (): Promise<FIIExtended[]> => {
  try {
    const response = await api.fiis.getAllFIIs()

    if (!response || !response.result || !Array.isArray(response.result)) {
      console.error('Unexpected API response structure:', response)
      return []
    }

    // Map the response to FIIExtended format
    const mappedFIIs = response.result.map((fii: any) => {
      const codigo = Array.isArray(fii.codigo) ? fii.codigo : fii.codigo ? [fii.codigo] : []

      const extendedFII: FIIExtended = {
        ...fii,
        nomeCompleto: fii.nomeCompletoFII || '',
        dataInicio: fii.quotaDateApproved || '',
        codigos: codigo.map((code: string) => ({
          codigo: code,
          preco: null,
          precoAnterior: null,
          variacao: null,
        })),
      }
      return extendedFII
    })

    return mappedFIIs
  } catch (error) {
    console.error('Erro ao buscar todas as FIIs:', error)
    return []
  }
}
