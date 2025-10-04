'use client'
import PublicIcon from '@mui/icons-material/Public'
import { Box, IconButton, Tab, Tabs, Tooltip } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import { TabPanel } from '@/components/Data-Display/TabPanel'
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import {
  AtivosTitle,
  VisualizationContainer,
  AtivosSearchWrapper,
  AtivosContainer,
  ContentBox,
  ContentWrapper,
  SubTitle,
} from '@/components/Shared-Styles/AtivosStyledComponents'
import { ETFFilter } from '@/services/api/types/etf'

import ETFSearchBar from './components/SearchBar'
import { VisualizationETFs } from './components/Visualization'
import { useETFTabsLogic } from './hooks/useETFTabsLogic'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

interface ETFProps {
  defaultPageSize?: number
  viewMode?: 'card' | 'table' | 'grid'
}

const ETF: React.FC<ETFProps> = ({ defaultPageSize, viewMode }) => {
  const [filters, setFilters] = React.useState<ETFFilter>({})
  const { value, handleChange } = useETFTabsLogic(viewMode)

  return (
    <ErrorBoundary>
      <PageTransition direction="up" duration={0.4} distance={30}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <ProgressiveLoad threshold={0.1} delay={0.2}>
            <ContentWrapper maxWidth="xl">
              <ContentBox>
                <AtivosTitle variant="h2" gutterBottom>
                  ETFs
                </AtivosTitle>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <SubTitle>Fundo de Índice | Exchange Traded Fund</SubTitle>
                  <Tooltip title="ETF de BDR" arrow>
                    <Link href="/etfbdr" passHref style={{ position: 'absolute', right: 0 }}>
                      <IconButton
                        sx={{
                          ml: 2,
                          '&:hover': {
                            color: (theme) => theme.palette.primary.main,
                            backgroundColor: 'rgba(128, 128, 128, 0.1)',
                          },
                        }}
                      >
                        <PublicIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </Box>

                <AtivosContainer>
                  <AtivosSearchWrapper>
                    <ETFSearchBar />
                  </AtivosSearchWrapper>

                  <VisualizationContainer>
                    <Tabs value={value} onChange={handleChange} aria-label="ETF visualization tabs">
                      <Tab label="Cartões" {...a11yProps(0)} />
                      <Tab label="Tabela" {...a11yProps(1)} />
                      <Tab label="Grade" {...a11yProps(2)} />
                    </Tabs>
                  </VisualizationContainer>
                  <TabPanel value={value} index={0}>
                    <VisualizationETFs view="card" filters={filters} defaultPageSize={defaultPageSize} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <VisualizationETFs view="table" filters={filters} defaultPageSize={defaultPageSize} />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <VisualizationETFs view="grid" filters={filters} defaultPageSize={defaultPageSize} />
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

export default ETF
