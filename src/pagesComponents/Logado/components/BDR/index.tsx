'use client'
import { Alert, Snackbar, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

import { useErrorHandling } from '@/components/Data-Display/ErrorHandling'
import { TabPanel } from '@/components/Data-Display/TabPanel'
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import {
  AtivosTitle,
  VisualizationContainer,
  ContentBox,
  ContentWrapper,
  SubTitle,
  AtivosContainer,
  AtivosSearchWrapper,
} from '@/components/Shared-Styles/AtivosStyledComponents'

import BDRSearchBar from './components/SearchBar'
import VisualizacaoBDRs from './components/Vizualização'
import { useBDRTabsLogic } from './hooks/useBDRTabsLogic'

interface BDRProps {
  defaultPageSize?: number
  viewMode?: 'card' | 'table' | 'grid'
}

export const BDR: React.FC<BDRProps> = ({ defaultPageSize, viewMode }) => {
  const { error, setError, clearError } = useErrorHandling()
  const [tabValue, setTabValue] = useState(0)
  const { value, handleChange } = useBDRTabsLogic({ initialViewMode: viewMode })

  return (
    <ErrorBoundary>
      <PageTransition direction="up" duration={0.4} distance={30}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <ProgressiveLoad threshold={0.1} delay={0.2}>
            <ContentWrapper maxWidth="xl">
              <ContentBox>
                <AtivosTitle variant="h2" gutterBottom>
                  BDRs
                </AtivosTitle>
                <SubTitle>Recebíveis de Depósitos Brasileiros</SubTitle>

                <AtivosContainer>
                  <AtivosSearchWrapper>
                    <BDRSearchBar />
                  </AtivosSearchWrapper>

                  <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={clearError}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
                      {error}
                    </Alert>
                  </Snackbar>

                  <VisualizationContainer>
                    <Tabs value={value} onChange={handleChange} aria-label="ETF visualization tabs">
                      <Tab label="Cartões" {...a11yProps(0)} />
                      <Tab label="Tabela" {...a11yProps(1)} />
                      <Tab label="Grade" {...a11yProps(2)} />
                    </Tabs>
                  </VisualizationContainer>
                  <TabPanel value={value} index={0}>
                    <VisualizacaoBDRs
                      mode="card"
                      filter={{}}
                      onError={setError}
                      defaultPageSize={defaultPageSize}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <VisualizacaoBDRs
                      mode="table"
                      filter={{}}
                      onError={setError}
                      defaultPageSize={defaultPageSize}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <VisualizacaoBDRs
                      mode="grid"
                      filter={{}}
                      onError={setError}
                      defaultPageSize={defaultPageSize}
                    />
                  </TabPanel>
                </AtivosContainer>
              </ContentBox>
            </ContentWrapper>
          </ProgressiveLoad>
        </SuspenseWrapper>
      </PageTransition>
    </ErrorBoundary>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default BDR
