import { Box, CircularProgress } from '@mui/material'
import React, { lazy } from 'react'

import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PriceDataPoint } from '@/pagesComponents/Logado/Empresa/components/EmpresaDetalhes/components/AnalisePrecos/utils/priceData'

import { EmpresaDetalhada } from '../../../types'
import { PriceDataPoint as GraficoPriceDataPoint } from '../components/GraficoHistorico/services/types'
import { StyledTab, StyledTabs, TabContent } from '../styled'

import { EmpresaHeader } from './EmpresaHeader'
import { TabPanel } from './TabPanel'

// Lazy imports para os componentes das abas
const LazyAnalisePrecos = lazy(() =>
  import('./AnalisePrecos').then((mod) => ({ default: mod.AnalisePrecos })),
)
const LazyDerivativosTab = lazy(() =>
  import('./DerivativosTab').then((mod) => ({ default: mod.DerivativosTab })),
)
const LazyDividendosTab = lazy(() =>
  import('./DividendosTab').then((mod) => ({ default: mod.DividendosTab })),
)
const LazyGraficoHistorico = lazy(() =>
  import('./GraficoHistorico').then((mod) => ({ default: mod.GraficoHistorico })),
)
const LazyMetricasEmpresa = lazy(() =>
  import('./MetricasEmpresa').then((mod) => ({ default: mod.MetricasEmpresa })),
)

interface Metricas {
  minimo52: number
  maximo52: number
  dividendYield: number
  valorizacao12m: number
}

interface EmpresaContentProps {
  empresa: EmpresaDetalhada
  codigoAtivo: string
  historicalData: PriceDataPoint[]
  graficoData?: GraficoPriceDataPoint[]
  metricas: Metricas
  currentTab: string
  handleTabChange: (event: React.SyntheticEvent, newValue: any) => void
  handleCodigoChange: (codigo: string) => void
  hasDerivatives: boolean
}

export const EmpresaContent: React.FC<EmpresaContentProps> = ({
  empresa,
  codigoAtivo,
  historicalData,
  graficoData = [],
  metricas,
  currentTab,
  handleTabChange,
  handleCodigoChange,
  hasDerivatives,
}) => {
  return (
    <>
      <EmpresaHeader empresa={empresa} codigoAtivo={codigoAtivo} onCodigoChange={handleCodigoChange} />

      <StyledTabs value={currentTab} onChange={handleTabChange} aria-label="Abas da empresa">
        <StyledTab label="Principal" value="principal" />
        <StyledTab label="Dividendos" value="dividendos" />
        {hasDerivatives && <StyledTab label="Derivativos" value="derivativos" />}
        <StyledTab label="Análise de Preços" value="analiseprecos" />
      </StyledTabs>

      <TabContent>
        <TabPanel value={currentTab} index="principal">
          <Box sx={{ mb: 4 }}>
            <SuspenseWrapper fallback={<CircularProgress />}>
              <LazyMetricasEmpresa
                valor={historicalData.length > 0 ? historicalData[historicalData.length - 1].valor : 0}
                variacao={
                  historicalData.length > 1
                    ? Number(
                        (
                          ((historicalData[historicalData.length - 1].valor -
                            historicalData[historicalData.length - 2].valor) /
                            historicalData[historicalData.length - 2].valor) *
                          100
                        ).toFixed(2),
                      )
                    : 0
                }
                minimo52={metricas.minimo52}
                maximo52={metricas.maximo52}
                dividendYield={metricas.dividendYield}
                valorizacao12m={metricas.valorizacao12m}
              />
            </SuspenseWrapper>
          </Box>

          <SuspenseWrapper fallback={<CircularProgress />}>
            <LazyGraficoHistorico codigoAtivo={codigoAtivo} />
          </SuspenseWrapper>
        </TabPanel>

        <TabPanel value={currentTab} index="dividendos">
          <SuspenseWrapper fallback={<CircularProgress />}>
            <LazyDividendosTab dividendos={empresa.dividendos || []} />
          </SuspenseWrapper>
        </TabPanel>

        <TabPanel value={currentTab} index="derivativos">
          <SuspenseWrapper fallback={<CircularProgress />}>
            <LazyDerivativosTab codigoBase={codigoAtivo} />
          </SuspenseWrapper>
        </TabPanel>

        <TabPanel value={currentTab} index="analiseprecos">
          <SuspenseWrapper fallback={<CircularProgress />}>
            <LazyAnalisePrecos codigoAtivo={codigoAtivo} />
          </SuspenseWrapper>
        </TabPanel>
      </TabContent>
    </>
  )
}
