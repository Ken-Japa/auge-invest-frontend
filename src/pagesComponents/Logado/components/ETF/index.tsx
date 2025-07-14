"use client";
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { VisualizationETFs } from './components/Visualization';
import { ETFTabsContainer } from './styled';
import { TabPanel } from './components/TabPanel';
import SearchBar from './components/SearchBar';
import { ETFFilter } from '@/services/api/types/etf';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ETF: React.FC = () => {
    const [value, setValue] = useState(0);
    const [filters, setFilters] = useState<ETFFilter>({});

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSearch = (newFilters: ETFFilter) => {
        setFilters(newFilters);
    };

    const handleClear = () => {
        setFilters({});
    };

    return (
        <ETFTabsContainer>
            <SearchBar onSearch={handleSearch} onClear={handleClear} initialFilters={filters} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="ETF visualization tabs">
                    <Tab label="Cartões" {...a11yProps(0)} />
                    <Tab label="Tabela" {...a11yProps(1)} />
                    <Tab label="Grade" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <VisualizationETFs view="card" filters={filters} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <VisualizationETFs view="table" filters={filters} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <VisualizationETFs view="grid" filters={filters} />
            </TabPanel>
        </ETFTabsContainer>
    );
};

export default ETF;