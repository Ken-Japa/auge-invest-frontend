import { api } from '@/services/api'

import { BDRExtended, BDRNPExtended, BDRType, UnifiedBDR } from '../types'

import { fetchBDRBySlugOrCode } from './fetchBDRBySlugOrCodeService'

export { fetchBDRBySlugOrCode }

export const getAllBDRs = async (bdrType: BDRType = 'todos'): Promise<UnifiedBDR[]> => {
  try {
    let patrocinados: BDRExtended[] = []
    let naoPatrocinados: BDRNPExtended[] = []

    // Busca BDRs patrocinados se necessário
    if (bdrType === 'patrocinado' || bdrType === 'todos') {
      try {
        const responsePatrocinados = await api.bdrs.getAllBDRs()

        if (
          responsePatrocinados &&
          responsePatrocinados.result &&
          Array.isArray(responsePatrocinados.result)
        ) {
          patrocinados = responsePatrocinados.result.map((bdr: any) => {
            const codigo = Array.isArray(bdr.codigo) ? bdr.codigo : bdr.codigo ? [bdr.codigo] : []

            const extendedBDR: BDRExtended = {
              ...bdr,
              nomeCompleto: bdr.nomeEmpresaCompleto || '',
              dataInicio: bdr.dataInicio || '',
              codigos: codigo.map((code: any) => {
                if (typeof code === 'string') {
                  return {
                    codigo: code,
                    preco: null,
                    precoAnterior: null,
                    variacao: null,
                  }
                } else {
                  // Assume code is an object, potentially BDRCode or similar
                  return {
                    codigo: code.codigo,
                    preco: code.preco ?? null,
                    precoAnterior: code.precoAnterior ?? null,
                    variacao: code.variacao ?? null,
                  }
                }
              }),
              isPatrocinado: true,
            }
            return extendedBDR
          })
        }
      } catch (error) {
        console.error('Erro ao buscar todas as BDRs patrocinadas:', error)
      }
    }

    // Busca BDRs não patrocinados se necessário
    if (bdrType === 'nao-patrocinado' || bdrType === 'todos') {
      try {
        const responseNaoPatrocinados = await api.bdrnp.getAllBDRNPs()

        if (
          responseNaoPatrocinados &&
          responseNaoPatrocinados.result &&
          Array.isArray(responseNaoPatrocinados.result)
        ) {
          naoPatrocinados = responseNaoPatrocinados.result.map((bdrnp: any) => {
            const codigo = Array.isArray(bdrnp.codigo) ? bdrnp.codigo : bdrnp.codigo ? [bdrnp.codigo] : []

            const extendedBDRNP: BDRNPExtended = {
              ...bdrnp,
              nomeCompleto: bdrnp.nomeEmpresaCompleto || '',
              dataInicio: bdrnp.dataInicio || '',
              codigos: codigo.map((code: any) => {
                if (typeof code === 'string') {
                  return {
                    codigo: code,
                    preco: null,
                    precoAnterior: null,
                    variacao: null,
                  }
                } else {
                  return {
                    codigo: code.codigo,
                    preco: code.preco ?? null,
                    precoAnterior: code.precoAnterior ?? null,
                    variacao: code.variacao ?? null,
                  }
                }
              }),
              isPatrocinado: false,
            }
            return extendedBDRNP
          })
        }
      } catch (error) {
        console.error('Erro ao buscar todas as BDRs não patrocinadas:', error)
      }
    }

    // Combina os resultados
    return [...patrocinados, ...naoPatrocinados]
  } catch (error) {
    console.error('Erro ao buscar todas as BDRs:', error)
    return []
  }
}
