import { api } from '@/services/api'

import { BDRExtended, BDRNPExtended, BDRType, UnifiedBDR } from '../types'

export const fetchBDRBySlugOrCode = async (
  slugOrCode: string,
  isCode = false,
  bdrType: BDRType = 'todos',
): Promise<UnifiedBDR | null> => {
  try {
    const decodedSlug = decodeURIComponent(slugOrCode)
    const upperCode = decodedSlug.trim().toUpperCase()
    const isCodeSearch = isCode || /^[A-Z]{4}11$/.test(upperCode)

    // Busca em BDRs patrocinados
    if (bdrType === 'patrocinado' || bdrType === 'todos') {
      try {
        // Se estamos buscando por código
        if (isCodeSearch) {
          const response = await api.bdrs.getBDRByCode({ codigoEmpresa: upperCode })

          if (response && response.result && response.result.length > 0) {
            const bdrItem = response.result[0]
            const codigos = bdrItem.codigo ? [{ codigo: bdrItem.codigo }] : []

            const extendedBDR: BDRExtended = {
              ...bdrItem,
              nomeEmpresa: bdrItem.nomeEmpresa || '',
              dataInicio: bdrItem.dataInicio || '',
              codigos: codigos,
              isPatrocinado: true,
            }

            return extendedBDR
          }
        } else {
          // Busca por nome em BDRs patrocinados
          const response = await api.bdrs.searchBDRs({
            searchTerm: decodedSlug,
            searchBy: 'nomeEmpresa',
          })

          if (response && response.result && Array.isArray(response.result)) {
            const normalizedSearchName = decodedSlug.trim()

            const matchingBDR = response.result.find((bdr: any) => {
              const bdrName = (bdr.nomeEmpresa || '').trim()
              return bdrName.toLowerCase() === normalizedSearchName.toLowerCase()
            })

            if (matchingBDR) {
              const codigos = matchingBDR.codigo
                ? [{ codigo: matchingBDR.codigo, preco: null, precoAnterior: null, variacao: null }]
                : []

              const extendedBDR: BDRExtended = {
                ...matchingBDR,
                nomeEmpresa: matchingBDR.nomeEmpresa || '',
                dataInicio: matchingBDR.dataInicio || '',
                codigos: codigos,
                isPatrocinado: true,
              }

              return extendedBDR
            }
          }
        }
      } catch (error) {
        console.error('Erro ao buscar BDR patrocinado:', error)
        // Continua para tentar buscar em BDRs não patrocinados
      }
    }

    // Busca em BDRs não patrocinados
    if (bdrType === 'nao-patrocinado' || bdrType === 'todos') {
      try {
        // Se estamos buscando por código
        if (isCodeSearch) {
          const bdrnp = await api.bdrnp.getBDRNPByCode(upperCode)

          if (bdrnp) {
            const codigos = bdrnp.codigo ? [{ codigo: bdrnp.codigo }] : []

            const extendedBDRNP: BDRNPExtended = {
              ...bdrnp,
              nomeEmpresa: bdrnp.nomeEmpresa || '',
              dataInicio: bdrnp.dataInicio || '',
              codigos: codigos,
              isPatrocinado: false,
            }

            return extendedBDRNP
          }
        } else {
          // Busca por nome em BDRs não patrocinados
          const response = await api.bdrnp.searchBDRNPs({
            searchTerm: decodedSlug,
            searchBy: 'nomeEmpresa',
          })

          if (response && response.result && Array.isArray(response.result)) {
            const normalizedSearchName = decodedSlug.trim()

            const matchingBDRNP = response.result.find((bdrnp: any) => {
              const bdrnpName = (bdrnp.nomeEmpresa || '').trim()
              return bdrnpName.toLowerCase() === normalizedSearchName.toLowerCase()
            })

            if (matchingBDRNP) {
              const codigos = matchingBDRNP.codigo ? [{ codigo: matchingBDRNP.codigo }] : []

              const extendedBDRNP: BDRNPExtended = {
                ...matchingBDRNP,
                nomeEmpresa: matchingBDRNP.nomeEmpresa || '',
                dataInicio: matchingBDRNP.dataInicio || '',
                codigos: codigos,
                isPatrocinado: false,
              }

              return extendedBDRNP
            }
          }
        }
      } catch (error) {
        console.error('Erro ao buscar BDR não patrocinado:', error)
      }
    }

    return null
  } catch (error) {
    console.error('Erro geral ao buscar BDR por slug ou código:', error)
    return null
  }
}
