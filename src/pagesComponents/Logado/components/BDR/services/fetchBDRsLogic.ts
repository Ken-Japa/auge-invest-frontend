import { api } from '@/services/api'
import { BDR, BDRNP } from '@/services/api/types'

import { BDRExtended, BDRFilter, BDRNPExtended, BDRType, UnifiedBDR } from '../types'

export const fetchPatrocinados = async (filter: BDRFilter, pageSize: number) => {
  const responsePatrocinados = await api.bdrs.getBDRs({
    segmento: filter.segmento,
    nomeEmpresa: filter.nomeEmpresa,
    page: filter.page !== undefined ? filter.page : 0,
    pageSize,
  })

  let patrocinados: BDRExtended[] = []
  let paginationPatrocinados = {
    offset: 0,
    limit: pageSize,
    total: 0,
    page: filter.page !== undefined ? filter.page + 1 : 1,
    pages: 1,
  }

  if (responsePatrocinados && responsePatrocinados.result && Array.isArray(responsePatrocinados.result)) {
    patrocinados = responsePatrocinados.result.map((bdr: BDR) => ({
      ...bdr,
      nomeEmpresa: bdr.nomeEmpresa || '',
      dataInicio: bdr.dataInicio || '',
      codigo: bdr.codigo || '',
      isPatrocinado: true,
    }))

    paginationPatrocinados = responsePatrocinados.pagination || {
      offset: 0,
      limit: pageSize,
      total: patrocinados.length,
      page: filter.page !== undefined ? filter.page + 1 : 1,
      pages: Math.ceil(patrocinados.length / pageSize) || 1,
    }
  }
  return { patrocinados, paginationPatrocinados }
}

export const fetchNaoPatrocinados = async (filter: BDRFilter, pageSize: number) => {
  const responseNaoPatrocinados = await api.bdrnp.getBDRNPs({
    segmento: filter.segmento,
    nomeEmpresa: filter.nomeEmpresa,
    page: filter.page !== undefined ? filter.page : 0,
    pageSize,
  })

  let naoPatrocinados: BDRNPExtended[] = []
  let paginationNaoPatrocinados = {
    offset: 0,
    limit: pageSize,
    total: 0,
    page: filter.page !== undefined ? filter.page + 1 : 1,
    pages: 1,
  }

  if (
    responseNaoPatrocinados &&
    responseNaoPatrocinados.result &&
    Array.isArray(responseNaoPatrocinados.result)
  ) {
    naoPatrocinados = responseNaoPatrocinados.result.map((bdrnp: BDRNP) => ({
      ...bdrnp,
      nomeEmpresa: bdrnp.nomeEmpresa || '',
      dataInicio: bdrnp.dataInicio || '',
      codigo: bdrnp.codigo || '',
      isPatrocinado: false,
    }))

    paginationNaoPatrocinados = responseNaoPatrocinados.pagination || {
      offset: 0,
      limit: pageSize,
      total: naoPatrocinados.length,
      page: filter.page !== undefined ? filter.page + 1 : 1,
      pages: Math.ceil(naoPatrocinados.length / pageSize) || 1,
    }
  }
  return { naoPatrocinados, paginationNaoPatrocinados }
}

export const fetchBDRs = async (filter: BDRFilter = {}) => {
  try {
    if (filter.nomeEmpresa && filter.nomeEmpresa.length < 3 && filter.nomeEmpresa !== '') {
      return {
        bdrs: [],
        pagination: {
          offset: 0,
          limit: filter.pageSize || 10,
          total: 0,
          page: 1,
          pages: 1,
        },
      }
    }

    const pageSize = filter.pageSize && filter.pageSize > 0 ? filter.pageSize : 10

    // Determina se devemos buscar BDRs patrocinados, não patrocinados ou ambos
    const bdrType: BDRType =
      filter.isPatrocinado === undefined ? 'todos' : filter.isPatrocinado ? 'patrocinado' : 'nao-patrocinado'

    let patrocinados: BDRExtended[] = []
    let naoPatrocinados: BDRNPExtended[] = []
    let paginationPatrocinados = {
      offset: 0,
      limit: pageSize,
      total: 0,
      page: filter.page !== undefined ? filter.page + 1 : 1,
      pages: 1,
    }
    let paginationNaoPatrocinados = { ...paginationPatrocinados }

    // Busca BDRs patrocinados se necessário
    if (bdrType === 'patrocinado' || bdrType === 'todos') {
      const { patrocinados: fetchedPatrocinados, paginationPatrocinados: fetchedPaginationPatrocinados } =
        await fetchPatrocinados(filter, pageSize)
      patrocinados = fetchedPatrocinados
      paginationPatrocinados = fetchedPaginationPatrocinados
    }

    // Busca BDRs não patrocinados se necessário
    if (bdrType === 'nao-patrocinado' || bdrType === 'todos') {
      const {
        naoPatrocinados: fetchedNaoPatrocinados,
        paginationNaoPatrocinados: fetchedPaginationNaoPatrocinados,
      } = await fetchNaoPatrocinados(filter, pageSize)
      naoPatrocinados = fetchedNaoPatrocinados
      paginationNaoPatrocinados = fetchedPaginationNaoPatrocinados
    }

    // Combina os resultados
    const combinedBDRs: UnifiedBDR[] = [...patrocinados, ...naoPatrocinados]

    // Calcula a paginação combinada
    const combinedPagination = {
      offset: 0,
      limit: pageSize,
      total:
        bdrType === 'todos'
          ? paginationPatrocinados.total + paginationNaoPatrocinados.total
          : bdrType === 'patrocinado'
            ? paginationPatrocinados.total
            : paginationNaoPatrocinados.total,
      page: filter.page !== undefined ? filter.page + 1 : 1,
      pages: Math.max(
        bdrType === 'todos'
          ? Math.max(paginationPatrocinados.pages, paginationNaoPatrocinados.pages)
          : bdrType === 'patrocinado'
            ? paginationPatrocinados.pages
            : paginationNaoPatrocinados.pages,
        1,
      ),
    }

    return {
      bdrs: combinedBDRs,
      pagination: combinedPagination,
    }
  } catch (error) {
    console.error('Erro ao buscar BDRs:', error)

    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    } else {
      console.error('Unknown error type:', error)
    }

    throw new Error('Não foi possível carregar os BDRs. Tente novamente mais tarde.')
  }
}
