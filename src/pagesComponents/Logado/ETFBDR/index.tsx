'use client'

import { Tab, Tabs, Tooltip } from '@mui/material'
import Link from 'next/link'
import { lazy, useState } from 'react'

import { TabPanel } from '@/components/Data-Display/TabPanel'
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'
import {
  AtivosTitle,
  VisualizationContainer,
  AtivosSearchWrapper,
  AtivosContainer,
  ContentBox,
  ContentWrapper,
  EtfIconLink,
} from '@/components/Shared-Styles/AtivosStyledComponents'
import { ETFBDRFilter } from '@/services/api/types/etfbdr'

import ETFBDRSearchBar from '../components/ETFBDR/components/SearchBar'
import { DashboardIconButton, DashboardIconStyled, HeaderWrapper } from './styled'

const LazyVisualizationETFBDRs = lazy(() =>
  import('../components/ETFBDR/components/Visualization').then((mod) => ({
    default: mod.VisualizationETFBDRs,
  })),
)

export const ETFBDRPage = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [filters, setFilters] = useState<ETFBDRFilter>({})

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <ErrorBoundary>
      <PageTransition direction="up" duration={0.4} distance={30}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <ProgressiveLoad threshold={0.1} delay={0.2}>
            <PageBackground imageName="ETF">
              <ContentWrapper maxWidth="xl">
                <ContentBox>
                  <HeaderWrapper>
                    <AtivosTitle variant="h2" gutterBottom>
                      ETF de BDRs
                    </AtivosTitle>
                    <EtfIconLink>
                      <Tooltip title="Voltar para ETFs" arrow>
                        <Link href="/etf" passHref>
                          <DashboardIconButton>
                            <DashboardIconStyled />
                          </DashboardIconButton>
                        </Link>
                      </Tooltip>
                    </EtfIconLink>
                  </HeaderWrapper>

                  <AtivosContainer>
                    <AtivosSearchWrapper>
                      <ETFBDRSearchBar />
                    </AtivosSearchWrapper>

                    <VisualizationContainer>
                      <Tabs value={currentTab} onChange={handleTabChange} aria-label="visualization tabs">
                        <Tab label="Cartões" />
                        <Tab label="Tabela" />
                        <Tab label="Grade" />
                      </Tabs>
                    </VisualizationContainer>

                    <TabPanel value={currentTab} index={0}>
                      <LazyVisualizationETFBDRs view="card" filters={filters} />
                    </TabPanel>
                    <TabPanel value={currentTab} index={1}>
                      <LazyVisualizationETFBDRs view="table" filters={filters} />
                    </TabPanel>
                    <TabPanel value={currentTab} index={2}>
                      <LazyVisualizationETFBDRs view="grid" filters={filters} />
                    </TabPanel>
                  </AtivosContainer>
                </ContentBox>
              </ContentWrapper>
            </PageBackground>
          </ProgressiveLoad>
        </SuspenseWrapper>
      </PageTransition>
    </ErrorBoundary>
  )
}
