'use client'

import DashboardIcon from '@mui/icons-material/Dashboard'
import { Box, IconButton, Tab, Tabs, Tooltip } from '@mui/material'
import Link from 'next/link'
import { lazy, useState } from 'react'

import { TabPanel } from '@/components/Data-Display/TabPanel'
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'
import { ETFBDRFilter } from '@/services/api/types/etfbdr'

import ETFBDRSearchBar from '../components/ETFBDR/components/SearchBar'

const LazyVisualizationETFBDRs = lazy(() =>
  import('../components/ETFBDR/components/Visualization').then((mod) => ({
    default: mod.VisualizationETFBDRs,
  })),
)
import { AbsoluteLink, ETFBDRTabsContainer, ETFTabsContainer, Title } from './styled'

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
              <ETFBDRTabsContainer>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <Title variant="h2" gutterBottom>
                    ETF de BDRs
                  </Title>
                  <AbsoluteLink>
                    <Tooltip title="Voltar para ETF" arrow>
                      <Link href="/etf" passHref>
                        <IconButton
                          sx={{
                            ml: 2,
                            '&:hover': {
                              color: (theme) => theme.palette.primary.main,
                              backgroundColor: 'rgba(128, 128, 128, 0.1)',
                            },
                          }}
                        >
                          <DashboardIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </AbsoluteLink>
                </Box>

                <ETFTabsContainer>
                  <ETFBDRSearchBar />

                  <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
                    <Tabs value={currentTab} onChange={handleTabChange} aria-label="visualization tabs">
                      <Tab label="Cards" />
                      <Tab label="Table" />
                      <Tab label="Grid" />
                    </Tabs>
                  </Box>

                  <TabPanel value={currentTab} index={0}>
                    <LazyVisualizationETFBDRs view="card" filters={filters} />
                  </TabPanel>
                  <TabPanel value={currentTab} index={1}>
                    <LazyVisualizationETFBDRs view="table" filters={filters} />
                  </TabPanel>
                  <TabPanel value={currentTab} index={2}>
                    <LazyVisualizationETFBDRs view="grid" filters={filters} />
                  </TabPanel>
                </ETFTabsContainer>
              </ETFBDRTabsContainer>
            </PageBackground>
          </ProgressiveLoad>
        </SuspenseWrapper>
      </PageTransition>
    </ErrorBoundary>
  )
}
