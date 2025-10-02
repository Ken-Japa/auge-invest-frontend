import { CircularProgress, SelectChangeEvent, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

import GraficoAnalisePreco from './components/GraficoAnalisePreco'
import Metricas from './components/Métricas'
// Componentes
import Periodo from './components/Periodo'
import SugestoesAlertas from './components/SugestoesAlertas'
import { fetchHistoricalData, preparePeriodData } from './services/analiseService'
import { Description, ErrorContainer, LoadingContainer, StyledPaper } from './styled'
import { AnalisePrecoProps, AnalysisPeriod } from './utils/types'

export const AnalisePrecos: React.FC<AnalisePrecoProps> = ({ codigoAtivo }) => {
  const [allHistoricalData, setAllHistoricalData] = useState<PriceDataPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod | null>(null)
  const [customYears, setCustomYears] = useState<number>(8.0)

  // Buscar todos os dados históricos
  useEffect(() => {
    const loadHistoricalData = async () => {
      if (!codigoAtivo) return

      setLoading(true)
      setError(null)

      try {
        const data = await fetchHistoricalData(codigoAtivo)
        setAllHistoricalData(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao buscar dados históricos')
        console.error('Erro ao buscar dados históricos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHistoricalData()
  }, [codigoAtivo])

  // Preparar dados para cada período
  const periodsData = useMemo(() => {
    return preparePeriodData(allHistoricalData, customYears)
  }, [allHistoricalData, customYears])

  // Definir período selecionado padrão quando periodsData estiver disponível
  useEffect(() => {
    if (periodsData.length > 0 && !selectedPeriod) {
      const defaultPeriod = periodsData.find((p) => p.period === '5y')?.period || periodsData[0].period
      setSelectedPeriod(defaultPeriod)
    }
  }, [periodsData, selectedPeriod])

  // Obter dados do período selecionado
  const selectedPeriodData = useMemo(() => {
    return periodsData.find((p) => p.period === selectedPeriod) || periodsData[0]
  }, [periodsData, selectedPeriod])

  // Manipulador para mudança de período
  const handlePeriodChange = (period: AnalysisPeriod | SelectChangeEvent) => {
    if (typeof period === 'string') {
      setSelectedPeriod(period)
    } else {
      setSelectedPeriod(period.target.value as AnalysisPeriod)
    }
  }

  // Manipulador para mudança no slider de anos personalizados
  const handleCustomYearsChange = (_: Event, value: number | number[]) => {
    setCustomYears(value as number)
  }

  return (
    <StyledPaper>
      <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Análise Estatística de Preços de {codigoAtivo}
      </Typography>
      <Description variant="body1" paragraph sx={{ textAlign: 'center', mb: 4 }}>
        Análise da distribuição histórica de preços para identificar níveis estatisticamente significativos
        para alertas de compra e venda.
      </Description>

      {loading ? (
        <LoadingContainer>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Carregando dados...
          </Typography>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <Typography color="error">{error}</Typography>
        </ErrorContainer>
      ) : (
        <>
          <Periodo
            selectedPeriod={selectedPeriod}
            customYears={customYears}
            periodsData={periodsData}
            onPeriodChange={handlePeriodChange}
            onCustomYearsChange={handleCustomYearsChange}
          />

          {selectedPeriodData && selectedPeriodData.stats && (
            <>
              <Metricas stats={selectedPeriodData.stats} />
              <GraficoAnalisePreco data={selectedPeriodData.stats} />
              <SugestoesAlertas
                mean={selectedPeriodData.stats.mean}
                stdDev={selectedPeriodData.stats.stdDev}
                data={selectedPeriodData.data}
                codigoAtivo={codigoAtivo || ''}
                selectedPeriod={selectedPeriod}
                onPeriodChange={handlePeriodChange}
              />
            </>
          )}
        </>
      )}
    </StyledPaper>
  )
}
