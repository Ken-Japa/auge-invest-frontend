'use client';

import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { SearchBar } from '../components/ETFBDR/components/SearchBar';
import { VisualizationETFBDRs } from '../components/ETFBDR/components/Visualization';
import { ETFBDRFilter } from '@/services/api/types/etfbdr';
import { TabPanel } from '../components/ETFBDR/components/TabPanel';

export const ETFBDRPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [filters, setFilters] = useState<ETFBDRFilter>({});

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSearch = (newFilters: ETFBDRFilter) => {
    setFilters(newFilters);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ETFBDRs
      </Typography>

      <SearchBar onSearch={handleSearch} />

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
    </Box>
  );
};