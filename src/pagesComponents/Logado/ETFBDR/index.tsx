'use client';

import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { TabPanel } from '@/components/Data-Display/TabPanel';

import ETFBDRSearchBar from '../components/ETFBDR/components/SearchBar';
import { VisualizationETFBDRs } from '../components/ETFBDR/components/Visualization';
import { ETFBDRFilter } from '@/services/api/types/etfbdr';

import { ETFBDRTabsContainer, Title } from './styled';

export const ETFBDRPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [filters, setFilters] = useState<ETFBDRFilter>({});

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ErrorBoundary>
      <PageTransition direction="up" duration={0.4} distance={30}>

        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <ProgressiveLoad threshold={0.1} delay={0.2}>
            <ETFBDRTabsContainer>
              <Title variant="h2" gutterBottom>
                ETF de BDRs
              </Title>

              <ETFBDRSearchBar />

              <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="visualization tabs">
                  <Tab label="Cards" />
                  <Tab label="Table" />
                  <Tab label="Grid" />
                </Tabs>
              </Box>

              <TabPanel value={currentTab} index={0}>
                <VisualizationETFBDRs view="card" filters={filters} />
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <VisualizationETFBDRs view="table" filters={filters} />
              </TabPanel>
              <TabPanel value={currentTab} index={2}>
                <VisualizationETFBDRs view="grid" filters={filters} />
              </TabPanel>
            </ETFBDRTabsContainer>
          </ProgressiveLoad>
        </SuspenseWrapper>
      </PageTransition>
    </ErrorBoundary >
  );
};