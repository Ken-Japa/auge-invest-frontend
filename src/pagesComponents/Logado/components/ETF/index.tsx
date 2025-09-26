"use client";
import React from 'react';
import Link from 'next/link';

import { Box, Tab, Tabs, Tooltip } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { PageTransition } from '@/components/Utils/PageTransition';
import { TabPanel } from '@/components/Data-Display/TabPanel';
import { ETFFilter } from '@/services/api/types/etf';

import ETFSearchBar from './components/SearchBar';
import { VisualizationETFs } from './components/Visualization';
import { useETFTabsLogic } from './hooks/useETFTabsLogic';

import { BoxVizualizationControl, ETFTabsContainer, SubTitle, Title, VIzualizerContainer } from './styled';

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
    const [filters, setFilters] = React.useState<ETFFilter>({});
    const { value, handleChange } = useETFTabsLogic();

    return (
        <ErrorBoundary>
            <PageTransition direction="up" duration={0.4} distance={30}>
                <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
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
                            <VIzualizerContainer>
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
                            </VIzualizerContainer>
                        </ETFTabsContainer>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary>
    );
};

export default ETF;