"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Tabs, Tab } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Tooltip } from '@mui/material';
import { ETFFilter } from '@/services/api/types/etf';
import { VisualizationETFs } from './components/Visualization';
import { TabPanel } from './components/TabPanel';
import ETFSearchBar from './components/SearchBar';
import { ETFTabsContainer, BoxVizualizationControl, Title, SubTitle } from './styled';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface ETFProps {
    defaultPageSize?: number;
}

const ETF: React.FC<ETFProps> = ({ defaultPageSize }) => {
    const [value, setValue] = useState(0);
    const [filters, setFilters] = useState<ETFFilter>({});

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <ETFTabsContainer>
            <Title variant="h2" gutterBottom>
                ETFs
            </Title>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
                <SubTitle>
                    Fundo de Índice | Exchange Traded Fund
                </SubTitle>
                <Tooltip title="ETF de BDR" arrow>
                    <Link href="/etfbdr" passHref style={{ position: 'absolute', right: 0 }}>
                        <PublicIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                    </Link>
                </Tooltip>
            </Box>
            <ETFSearchBar />
            <BoxVizualizationControl >
                <Tabs value={value} onChange={handleChange} aria-label="ETF visualization tabs">
                    <Tab label="Cartões" {...a11yProps(0)} />
                    <Tab label="Tabela" {...a11yProps(1)} />
                    <Tab label="Grade" {...a11yProps(2)} />
                </Tabs>
            </BoxVizualizationControl>
            <TabPanel value={value} index={0}>
                <VisualizationETFs view="card" filters={filters} defaultPageSize={defaultPageSize} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <VisualizationETFs view="table" filters={filters} defaultPageSize={defaultPageSize} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <VisualizationETFs view="grid" filters={filters} defaultPageSize={defaultPageSize} />
            </TabPanel>
        </ETFTabsContainer>
    );
};

export default ETF;