import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'

import { SumarioData as TabelaViewSumarioData } from '../../TabelaView/types'
import { sumarioService } from '../../utils/sumarioService'
import { CORES_INDUSTRIAS } from '../constants/colors'
import { SumarioData as RedeNeuralSumarioData } from '../types'
import { transformSumarioData } from '../utils/transformSumarioData'

import { buildGraphData } from './graphBuilder'
import { adjustColorHSL } from './graphUtils'

interface GraphData {
  nodes: any[]
  edges: any[]
}

interface UseGraphDataResult {
  graphData: GraphData
  isLoading: boolean
  error: string | null
  industriesForDropdown: { id: string; label: string; color: string }[]
  segmentsForDropdown: {
    industryId: string
    industryLabel: string
    color: string
    segments: { id: string; label: string }[]
  }[]
}

export const useGraphData = (onLoadingChange?: (loading: boolean) => void): UseGraphDataResult => {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    edges: [],
  })
  const theme = useTheme()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [industriesForDropdown, setIndustriesForDropdown] = useState<
    { id: string; label: string; color: string }[]
  >([])
  const [segmentsForDropdown, setSegmentsForDropdown] = useState<
    {
      industryId: string
      industryLabel: string
      color: string
      segments: { id: string; label: string }[]
    }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        onLoadingChange?.(true)
        const data = await sumarioService.getSumarioData()

        const nodes: any[] = []
        const edges: any[] = []

        // Calculate max values for sizing
        const maxIndustriaValue = Math.max(...data.sumario.map((ind) => ind.valorMercadoTotal))
        const maxSegmentoValue = Math.max(
          ...data.sumario.flatMap((ind) => ind.segmentos.map((seg) => seg.valorMercado)),
        )
        const maxEmpresaValue = Math.max(
          ...data.sumario.flatMap((ind) =>
            ind.segmentos.flatMap((seg) => seg.empresasDetalhes.map((emp) => emp.valorMercado)),
          ),
        )

        // Construir o grafo
        const transformedData: RedeNeuralSumarioData = transformSumarioData(data as TabelaViewSumarioData)
        const dropdownIndustries: {
          id: string
          label: string
          color: string
        }[] = []
        transformedData.sumario.forEach((industria, index) => {
          const color = adjustColorHSL(CORES_INDUSTRIAS[index % CORES_INDUSTRIAS.length], {
            s: 0.15,
            l: 0.05,
          })
          dropdownIndustries.push({
            id: `industria-${industria.industria}`,
            label: industria.industria,
            color: color,
          })
        })
        setIndustriesForDropdown(dropdownIndustries)

        const segmentsGroupedByIndustry: {
          industryId: string
          industryLabel: string
          color: string
          segments: { id: string; label: string }[]
        }[] = []
        transformedData.sumario.forEach((industria, index) => {
          const industrySegments = industria.segmentos.map((seg) => ({
            id: `segmento-${seg.segmento}`,
            label: seg.segmento,
          }))
          const industryColor =
            dropdownIndustries.find((di) => di.id === `industria-${industria.industria}`)?.color || '#CCCCCC' // Default color if not found
          segmentsGroupedByIndustry.push({
            industryId: `industria-${industria.industria}`,
            industryLabel: industria.industria,
            color: industryColor,
            segments: industrySegments,
          })
        })
        setSegmentsForDropdown(segmentsGroupedByIndustry)

        buildGraphData({
          data: transformedData,
          nodes,
          edges,
          maxIndustriaValue,
          maxSegmentoValue,
          maxEmpresaValue,
          valorMercadoTotalGeral: data.sumarioTotal.valorMercadoTotalGeral,
          theme,
        })

        setGraphData({ nodes, edges })
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        setError('Falha ao carregar os dados do gráfico')
      } finally {
        setIsLoading(false)
        onLoadingChange?.(false)
      }
    }

    fetchData()
  }, [onLoadingChange, theme])

  return {
    graphData,
    isLoading,
    error,
    industriesForDropdown,
    segmentsForDropdown,
  }
}
