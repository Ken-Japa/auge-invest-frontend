'use client'
import { Tab, Tabs } from '@mui/material'
import React from 'react'

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
  AtivosContainer,
  AtivosSearchWrapper,
} from '@/components/Shared-Styles/AtivosStyledComponents'

import FIISearchBar from './components/SearchBar'
import { VisualizacaoFIIs } from './components/Vizualização'
import { useFIITabsLogic } from './hooks/useFIITabsLogic'

interface FIIProps {
  defaultPageSize?: number
  viewMode?: 'card' | 'table' | 'grid'
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const FII: React.FC<FIIProps> = ({ defaultPageSize, viewMode }) => {
  const { setError } = useErrorHandling()
  const { value, handleChange } = useFIITabsLogic(viewMode)

  return (
    <ErrorBoundary>
      <PageTransition direction="up" duration={0.4} distance={30}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <ProgressiveLoad threshold={0.1} delay={0.2}>
            <ContentWrapper maxWidth="xl">
              <ContentBox>
                <AtivosTitle variant="h2" gutterBottom>
                  Fundos Imobiliários
                </AtivosTitle>
                <AtivosContainer>
                  <AtivosSearchWrapper>
                    <FIISearchBar />
                  </AtivosSearchWrapper>
                  <VisualizationContainer>
                    <Tabs value={value} onChange={handleChange} aria-label="ETF visualization tabs">
                      <Tab label="Cartões" {...a11yProps(0)} />
                      <Tab label="Tabela" {...a11yProps(1)} />
                      <Tab label="Grade" {...a11yProps(2)} />
                    </Tabs>
                  </VisualizationContainer>
                  <TabPanel value={value} index={0}>
                    <VisualizacaoFIIs
                      mode="card"
                      filter={{}}
                      onError={setError}
                      defaultPageSize={defaultPageSize}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <VisualizacaoFIIs
                      mode="table"
                      filter={{}}
                      onError={setError}
                      defaultPageSize={defaultPageSize}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <VisualizacaoFIIs
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

export default FII
