import { CircularProgress, Typography } from '@mui/material'
import React from 'react'

import { useChartStyles } from '../../utils/chartConfig'
import PriceChart from './components/PriceChart'
import {
  EmptyDataContainer,
  ErrorContainer,
  GraficoContainer,
  GraficoTitle,
  LoadingContainer,
} from './GraficoHistoricoAlertas.styled'
import { useChartDataProcessing } from './hooks/useChartDataProcessing'
import { useChartMarkers } from './hooks/useChartMarkers'
import { GraficoHistoricoAlertasProps } from './utils/types'

const GraficoHistoricoAlertas: React.FC<GraficoHistoricoAlertasProps> = ({
  data,
  isLoading = false,
  isError = null,
  alertaCompra,
  alertaVenda,
}) => {
  const chartStyles = useChartStyles()
  const { chartData, formattedChartData, customTickValues } = useChartDataProcessing(data)
  const markers = useChartMarkers(alertaCompra ?? null, alertaVenda ?? null, chartStyles)

  return (
    <GraficoContainer>
      <GraficoTitle variant="h6">Histórico de Preços com Alertas</GraficoTitle>

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ mt: 2, color: chartStyles.colors.text }}>
            Carregando dados...
          </Typography>
        </LoadingContainer>
      ) : isError ? (
        <ErrorContainer>
          <Typography variant="body1" sx={{ color: chartStyles.colors.error }}>
            Erro ao carregar o gráfico.
          </Typography>
        </ErrorContainer>
      ) : chartData.length === 0 ? (
        <EmptyDataContainer>
          <Typography variant="body1" sx={{ color: chartStyles.colors.text }}>
            Nenhum dado disponível para o período selecionado
          </Typography>
        </EmptyDataContainer>
      ) : (
        <PriceChart
          formattedChartData={formattedChartData}
          customTickValues={customTickValues}
          markers={markers}
          chartStyles={chartStyles}
          alertaCompra={alertaCompra ?? null}
          alertaVenda={alertaVenda ?? null}
          chartDataLength={chartData.length}
        />
      )}
    </GraficoContainer>
  )
}

export default GraficoHistoricoAlertas
