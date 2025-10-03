import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useCallback, useEffect, useState } from 'react'

import { sumarioService } from '@/pagesComponents/Logado/components/EmpresaView/Elementos/ModoVisualizacao/utils/sumarioService'
import { api } from '@/services/api'
import { BDR } from '@/services/api/types/bdr'
import { ETF } from '@/services/api/types/etf'
import { ETFBDR } from '@/services/api/types/etfbdr'
import { FII } from '@/services/api/types/fii'

import { GlobalSearchContainer } from './styled'

interface SearchOption {
  label: string
  value: string
  type?: string
  id?: string
  assetType?: 'BDR' | 'Empresa' | 'ETF' | 'ETFBDR' | 'FII' | 'ETFUnificada'
}

interface GlobalSearchBarProps {
  type?:
    | 'BDR'
    | 'Empresa'
    | 'ETF'
    | 'ETFBDR'
    | 'FII'
    | 'Todos'
    | 'ETFUnificada'
    | 'TodosSimplificado'
    | 'Select'
  onSelect?: (option: SearchOption) => void
  filterAssetType?: 'BDR' | 'Empresa' | 'ETF' | 'ETFBDR' | 'FII'
}

const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ type, onSelect, filterAssetType }) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [options, setOptions] = useState<SearchOption[]>([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const fetchOptions = useCallback(async (): Promise<SearchOption[]> => {
    let searchOptions: SearchOption[] = []
    try {
      switch (type) {
        case 'BDR':
          const bdrResponse = await api.bdrs.getAllBDRs()
          if (bdrResponse?.result?.length) {
            bdrResponse.result.forEach((bdr: BDR) => {
              searchOptions.push({
                label: `${bdr.nomeEmpresa} (${bdr.codigo})`,
                value: bdr.nomeEmpresa || '',
                id: bdr.nomeEmpresa || '',
                assetType: 'BDR',
              })
              searchOptions.push({
                label: `${bdr.codigo} (${bdr.nomeEmpresa})`,
                value: bdr.nomeEmpresa || '',
                id: bdr.nomeEmpresa || '',
                assetType: 'BDR',
              })
            })
          }
          break
        case 'ETFBDR':
          const etfbdrResponse = await api.etfbdr.getAllETFBDRs()
          if (etfbdrResponse?.result?.length) {
            etfbdrResponse.result.forEach((etfbdr: ETFBDR) => {
              searchOptions.push({
                label: `${etfbdr.nomeETF}`,
                value: etfbdr.nomeETF || '',
                id: etfbdr.nomeETF || '',
                assetType: 'ETFBDR',
              })
            })
          }
          break
        case 'FII':
          const fiiResponse = await api.fiis.getFIIs({ pageSize: 1000 })
          if (fiiResponse?.result?.length) {
            fiiResponse.result.forEach((fii: FII) => {
              searchOptions.push({
                label: `${fii.nomeFII} (${fii.codigoFII})`,
                value: fii.codigoFII || '',
                id: `${fii.codigoFII}` || '',
                assetType: 'FII',
              })
              searchOptions.push({
                label: `${fii.codigo} (${fii.nomeFII})`,
                value: `${fii.codigoFII}` || '',
                id: `${fii.codigoFII}` || '',
                assetType: 'FII',
              })
            })
          }
          break
        case 'ETF':
          const etfResponse = await api.etf.getAllETFs()
          if (etfResponse?.result?.length) {
            etfResponse.result.forEach((etf: ETF) => {
              searchOptions.push({
                label: `${etf.nomeETF} (${etf.codigo})`,
                value: etf.codigo || '',
                id: etf.codigo || '',
                assetType: 'ETF',
              })
              searchOptions.push({
                label: `${etf.codigo} (${etf.nomeETF})`,
                value: etf.codigo || '',
                id: etf.codigo || '',
                assetType: 'ETF',
              })
            })
          }
          break
        case 'Empresa':
          const { sumario } = await sumarioService.getSumarioData()
          sumario.forEach((industria) => {
            industria.segmentos.forEach((segmento) => {
              segmento.empresasDetalhes.forEach((empresa) => {
                if (empresa.codigos && empresa.codigos.length > 0) {
                  searchOptions.push({
                    label: `${empresa.empresa} (Empresa)`,
                    value: empresa.codigos[0].codigo,
                    id: empresa.codigos[0].codigo,
                    assetType: 'Empresa',
                  })
                  empresa.codigos.forEach((codigo) => {
                    searchOptions.push({
                      label: `${codigo.codigo} (${empresa.empresa})`,
                      value: codigo.codigo,
                      id: codigo.codigo,
                      assetType: 'Empresa',
                    })
                  })
                }
              })
            })
          })
          break
        case 'ETFUnificada':
          const etfUnifiedResponse = await api.etf.getAllETFs()
          const etfbdrUnifiedResponse = await api.etfbdr.getAllETFBDRs()

          if (etfUnifiedResponse?.result?.length) {
            const mappedETFs = etfUnifiedResponse.result.map((etf: ETF) => ({
              label: `${etf.nomeETF} (${etf.codigo})`,
              value: etf.codigo || '',
              id: etf.codigo || '',
              assetType: 'ETF' as const,
            }))
            searchOptions = [...searchOptions, ...mappedETFs]
          }
          if (etfbdrUnifiedResponse?.result?.length) {
            etfbdrUnifiedResponse.result.forEach((etfbdr: ETFBDR) => {
              searchOptions.push({
                label: `${etfbdr.nomeETF} `,
                value: etfbdr.nomeETF || '',
                id: etfbdr.nomeETF || '',
                assetType: 'ETFBDR',
              })
            })
          }
          break
        case 'Todos':
          const allBDRs = await api.bdrs.getAllBDRs()
          if (allBDRs?.result?.length) {
            allBDRs.result.forEach((bdr: BDR) => {
              searchOptions.push({
                label: `${bdr.nomeEmpresa} (${bdr.codigo})`,
                value: bdr.nomeEmpresa || '',
                id: bdr.nomeEmpresa || '',
                assetType: 'BDR',
              })
              searchOptions.push({
                label: `${bdr.codigo} (${bdr.nomeEmpresa})`,
                value: bdr.nomeEmpresa || '',
                id: bdr.nomeEmpresa || '',
                assetType: 'BDR',
              })
            })
          }

          const allETFBDRs = await api.etfbdr.getAllETFBDRs()
          if (allETFBDRs?.result?.length) {
            allETFBDRs.result.forEach((etfbdr: ETFBDR) => {
              searchOptions.push({
                label: `${etfbdr.nomeETF} (${etfbdr.codigo})`,
                value: etfbdr.nomeETF || '',
                id: etfbdr.nomeETF || '',
                assetType: 'ETFBDR',
              })
              searchOptions.push({
                label: `${etfbdr.codigo} (${etfbdr.nomeETF})`,
                value: etfbdr.nomeETF || '',
                id: etfbdr.nomeETF || '',
                assetType: 'ETFBDR',
              })
            })
          }

          const allFIIs = await api.fiis.getFIIs({ pageSize: 1000 })
          if (allFIIs?.result?.length) {
            allFIIs.result.forEach((fii: FII) => {
              searchOptions.push({
                label: `${fii.nomeFII} (${fii.codigoFII})`,
                value: fii.codigoFII || '',
                id: `${fii.codigoFII}` || '',
                assetType: 'FII',
              })
              searchOptions.push({
                label: `${fii.codigo} (${fii.nomeFII})`,
                value: `${fii.codigoFII}` || '',
                id: `${fii.codigoFII}` || '',
                assetType: 'FII',
              })
            })
          }

          const allETFs = await api.etf.getAllETFs()
          if (allETFs?.result?.length) {
            const mappedETFs = allETFs.result.map((etf: ETF) => ({
              label: `${etf.nomeETF} (${etf.codigo})`,
              value: etf.codigo || '',
              id: etf.codigo || '',
              assetType: 'ETF' as const,
            }))
            searchOptions = [...searchOptions, ...mappedETFs]
          }

          const { sumario: allSumario } = await sumarioService.getSumarioData()
          allSumario.forEach((industria) => {
            industria.segmentos.forEach((segmento) => {
              segmento.empresasDetalhes.forEach((empresa) => {
                if (empresa.codigos && empresa.codigos.length > 0) {
                  searchOptions.push({
                    label: `${empresa.empresa} (Empresa)`,
                    value: empresa.codigos[0].codigo,
                    id: empresa.codigos[0].codigo,
                    assetType: 'Empresa',
                  })
                  empresa.codigos.forEach((codigo) => {
                    searchOptions.push({
                      label: `${codigo.codigo} (${empresa.empresa})`,
                      value: codigo.codigo,
                      id: codigo.codigo,
                      assetType: 'Empresa',
                    })
                  })
                }
              })
            })
          })
          break

        case 'Select':
          if (!filterAssetType || filterAssetType === 'BDR') {
            const allBDRsSelect = await api.bdrs.getAllBDRs()
            if (allBDRsSelect?.result?.length) {
              allBDRsSelect.result.forEach((bdr: BDR) => {
                searchOptions.push({
                  label: `${bdr.codigo} (${bdr.nomeEmpresa})`,
                  value: bdr.codigo || '',
                  id: `${bdr.nomeEmpresa} - ${bdr.codigo}` || '',
                  assetType: 'BDR',
                })
              })
            }
          }

          if (!filterAssetType || filterAssetType === 'ETFBDR') {
            const allETFBDRsSelect = await api.etfbdr.getAllETFBDRs()
            if (allETFBDRsSelect?.result?.length) {
              allETFBDRsSelect.result.forEach((etfbdr: ETFBDR) => {
                searchOptions.push({
                  label: `${etfbdr.codigo} (${etfbdr.nomeETF})`,
                  value: etfbdr.codigo || '',
                  id: `${etfbdr.nomeETF} - ${etfbdr.codigo}` || '',

                  assetType: 'ETFBDR',
                })
              })
            }
          }

          if (!filterAssetType || filterAssetType === 'FII') {
            const allFIIsSelect = await api.fiis.getFIIs({ pageSize: 1000 })
            if (allFIIsSelect?.result?.length) {
              allFIIsSelect.result.forEach((fii: FII) => {
                searchOptions.push({
                  label: `${fii.codigo} (${fii.nomeFII})`,
                  value: `${fii.codigoFII}` || '',
                  id: `${fii.nomeFII} - ${fii.codigoFII}` || '',
                  assetType: 'FII',
                })
              })
            }
          }

          if (!filterAssetType || filterAssetType === 'ETF') {
            const allETFsSelect = await api.etf.getAllETFs()
            if (allETFsSelect?.result?.length) {
              const mappedETFs = allETFsSelect.result.map((etf: ETF) => ({
                label: `${etf.codigo} (${etf.nomeETF})`,
                value: etf.codigo || '',
                id: `${etf.nomeETF} - ${etf.codigo}` || '',
                assetType: 'ETF' as const,
              }))
              searchOptions = [...searchOptions, ...mappedETFs]
            }
          }

          if (!filterAssetType || filterAssetType === 'Empresa') {
            const { sumario: allSumarioSelect } = await sumarioService.getSumarioData()

            allSumarioSelect.forEach((industria) => {
              industria.segmentos.forEach((segmento) => {
                segmento.empresasDetalhes.forEach((empresa) => {
                  if (empresa.codigos && empresa.codigos.length > 0) {
                    empresa.codigos.forEach((codigo) => {
                      searchOptions.push({
                        label: `${codigo.codigo} (${empresa.empresa})`,
                        value: codigo.codigo,
                        id: `${empresa.empresa} - ${codigo.codigo}`,
                        assetType: 'Empresa',
                      })
                    })
                  }
                })
              })
            })
          }
          break

        case 'TodosSimplificado':
          const allBDRsSimples = await api.bdrs.getAllBDRs()
          if (allBDRsSimples?.result?.length) {
            allBDRsSimples.result.forEach((bdr: BDR) => {
              searchOptions.push({
                label: `${bdr.codigo} (${bdr.nomeEmpresa})`,
                value: bdr.nomeEmpresa || '',
                id: bdr.nomeEmpresa || '',
                assetType: 'BDR',
              })
            })
          }

          const allETFBDRsSimples = await api.etfbdr.getAllETFBDRs()
          if (allETFBDRsSimples?.result?.length) {
            allETFBDRsSimples.result.forEach((etfbdr: ETFBDR) => {
              searchOptions.push({
                label: `${etfbdr.codigo} (${etfbdr.nomeETF})`,
                value: etfbdr.nomeETF || '',
                id: etfbdr.nomeETF || '',
                assetType: 'ETFBDR',
              })
            })
          }

          const allFIIsSimples = await api.fiis.getFIIs({ pageSize: 1000 })
          if (allFIIsSimples?.result?.length) {
            allFIIsSimples.result.forEach((fii: FII) => {
              searchOptions.push({
                label: `${fii.codigo} (${fii.nomeFII})`,
                value: `${fii.codigoFII}` || '',
                id: `${fii.codigoFII}` || '',
                assetType: 'FII',
              })
            })
          }

          const allETFsSimples = await api.etf.getAllETFs()
          if (allETFsSimples?.result?.length) {
            const mappedETFs = allETFsSimples.result.map((etf: ETF) => ({
              label: `${etf.nomeETF} (${etf.codigo})`,
              value: etf.codigo || '',
              id: etf.codigo || '',
              assetType: 'ETF' as const,
            }))
            searchOptions = [...searchOptions, ...mappedETFs]
          }

          const { sumario: allSumarioSimples } = await sumarioService.getSumarioData()

          allSumarioSimples.forEach((industria) => {
            industria.segmentos.forEach((segmento) => {
              segmento.empresasDetalhes.forEach((empresa) => {
                if (empresa.codigos && empresa.codigos.length > 0) {
                  empresa.codigos.forEach((codigo) => {
                    searchOptions.push({
                      label: `${codigo.codigo} (${empresa.empresa})`,
                      value: codigo.codigo,
                      id: codigo.codigo,
                      assetType: 'Empresa',
                    })
                  })
                }
              })
            })
          })
          break

        default:
          // Handle default case or no type specified
          break
      }
    } catch (error) {
      console.error(`Error fetching ${type}s:`, error)
    }
    return searchOptions
  }, [type, filterAssetType])

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true)
      const fetchedOptions = await fetchOptions()
      setOptions(fetchedOptions)
      setLoading(false)
    }
    loadOptions()
  }, [fetchOptions])

  const handleClearSearch = () => {
    setSearchQuery('')
    setInputValue('')
  }

  const handleOptionSelect = (option: SearchOption | null) => {
    if (option) {
      if (onSelect) {
        onSelect(option)
        setInputValue(option.value)
        setSearchQuery(option.value)
      } else {
        handleSearch(option)
      }
    }
  }

  const handleSearch = (option: SearchOption | null) => {
    if (option && option.id) {
      switch (type) {
        case 'BDR':
          router.push(`/bdr/${option.value}`)
          break
        case 'ETFBDR':
          router.push(`/etfbdr/${option.value}`)
          break
        case 'FII':
          router.push(`/fii/${option.value}`)
          break
        case 'ETF':
          router.push(`/etf/${option.value}`)
          break
        case 'Empresa':
          router.push(`/empresa/${option.value}`)
          break
        case 'ETFUnificada':
          if (option.assetType === 'ETF') {
            router.push(`/etf/${option.value}`)
          } else if (option.assetType === 'ETFBDR') {
            router.push(`/etfbdr/${option.value}`)
          }
          break
        case 'Todos':
          if (option.assetType === 'BDR') {
            router.push(`/bdr/${option.value}`)
          } else if (option.assetType === 'Empresa') {
            router.push(`/empresa/${option.value}`)
          } else if (option.assetType === 'ETF') {
            router.push(`/etf/${option.value}`)
          } else if (option.assetType === 'ETFBDR') {
            router.push(`/etfbdr/${option.value}`)
          } else if (option.assetType === 'FII') {
            router.push(`/fii/${option.value}`)
          }
          break
        case 'TodosSimplificado':
          if (option.assetType === 'BDR') {
            router.push(`/bdr/${option.value}`)
          } else if (option.assetType === 'Empresa') {
            router.push(`/empresa/${option.value}`)
          } else if (option.assetType === 'ETF') {
            router.push(`/etf/${option.value}`)
          } else if (option.assetType === 'ETFBDR') {
            router.push(`/etfbdr/${option.value}`)
          } else if (option.assetType === 'FII') {
            router.push(`/fii/${option.value}`)
          }
          break
        default:
          break
      }
    }
  }

  const getPlaceholder = () => {
    switch (type) {
      case 'BDR':
        return 'Buscar BDRs...'
      case 'Empresa':
        return 'Buscar empresa ou código...'
      case 'ETF':
        return 'Buscar ETFs...'
      case 'ETFBDR':
        return 'Buscar ETF de BDRs...'
      case 'FII':
        return 'Buscar FIIs...'
      case 'Todos':
        return 'Buscar todos os ativos...'
      case 'TodosSimplificado':
        return 'Buscar todos os ativos...'
      case 'Select':
        return 'Selecione o ativo'
      case 'ETFUnificada':
        return 'Buscar ETFs e ETF de BDRs...'
      default:
        return 'Buscar ativos...'
    }
  }

  return (
    <GlobalSearchContainer>
      <Autocomplete
        options={options}
        loading={loading}
        inputValue={inputValue}
        filterOptions={(options, { inputValue }) => {
          const inputLower = inputValue.toLowerCase()
          if (inputLower.length < 2) {
            return []
          }
          return options.filter((option) => option.label.toLowerCase().includes(inputLower))
        }}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          }
          if (type === 'Select') {
            return option.value
          }
          return option.label
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            placeholder={getPlaceholder()}
            InputProps={{
              ...params.InputProps,
              style: {
                minWidth: '250px',
                padding: '2px 4px',
              },
              endAdornment: (
                <InputAdornment position="end">
                  {inputValue ? (
                    <IconButton aria-label="clear search" onClick={handleClearSearch} edge="end" size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <SearchIcon color="action" />
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
        onChange={(_, newValue) => {
          if (newValue && typeof newValue !== 'string') {
            handleOptionSelect(newValue)
          }
        }}
        value={options.find((option) => option.value === inputValue) || null}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
          setSearchQuery(newInputValue)
        }}
      />
    </GlobalSearchContainer>
  )
}

export default GlobalSearchBar
