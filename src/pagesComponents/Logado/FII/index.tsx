"use client";
import { useState } from 'react';
import { Box, Typography, Alert, Snackbar, Tabs, Tab } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { VisualizacaoFIIs } from '../components/FIIs/components/Vizualização';
import { FIISearchBar } from '../components/FIIs/components/SearchBar';
import { VisualizationMode } from '../components/FIIs/types';
import {
    FIIPageContainer,
    ContentWrapper,
    ContentBox,
    FIITitle,
    FIITabsContainer,
    TabPanelContainer
} from './styled';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`fii-tabpanel-${index}`}
            aria-labelledby={`fii-tab-${index}`}
            {...other}
        >
            {value === index && <TabPanelContainer>{children}</TabPanelContainer>}
        </div>
    );
}

export const FII = () => {
    const [tabValue, setTabValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<VisualizationMode>('card');
    const [key, setKey] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSearch = (query: string) => {
        setError(null);
        setSearchQuery(query);
        if (query && query.length >= 4) {
            setShowSearchResults(true);
        } else {
            setShowSearchResults(false);
        }
    };

    const handleViewModeChange = (mode: VisualizationMode) => {
        setViewMode(mode);
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
    };

    const handleCloseError = () => {
        setError(null);
    };

    const getViewMode = (): VisualizationMode => {
        switch (tabValue) {
            case 0:
                return 'card';
            case 1:
                return 'table';
            case 2:
                return 'grid';
            default:
                return 'card';
        }
    };

    return (
        <PageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <SuspenseWrapper>
                    <FIIPageContainer>
                        <ContentWrapper maxWidth="xl">
                            <ContentBox>
                                <FIITitle variant="h2" gutterBottom>
                                    Fundos Imobiliários
                                </FIITitle>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                                    <FIISearchBar onSearch={handleSearch} />
                                </Box>

                                <Snackbar
                                    open={!!error}
                                    autoHideDuration={6000}
                                    onClose={handleCloseError}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                >
                                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                                        {error}
                                    </Alert>
                                </Snackbar>

                                <FIITabsContainer>
                                    <Tabs
                                        value={tabValue}
                                        onChange={handleTabChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        aria-label="Modos de visualização de FIIs"
                                        centered
                                    >
                                        <Tab label="Cartões" />
                                        <Tab label="Tabela" />
                                        <Tab label="Grade" />
                                    </Tabs>

                                    <TabPanel value={tabValue} index={0}>
                                        <VisualizacaoFIIs
                                            mode="card"
                                            filter={{}}
                                            limit={12}
                                            onError={handleError}
                                        />
                                    </TabPanel>

                                    <TabPanel value={tabValue} index={1}>
                                        <VisualizacaoFIIs
                                            mode="table"
                                            filter={{}}
                                            limit={20}
                                            onError={handleError}
                                        />
                                    </TabPanel>

                                    <TabPanel value={tabValue} index={2}>
                                        <VisualizacaoFIIs
                                            mode="grid"
                                            filter={{}}
                                            limit={24}
                                            onError={handleError}
                                        />
                                    </TabPanel>
                                </FIITabsContainer>
                            </ContentBox>
                        </ContentWrapper>
                    </FIIPageContainer>
                </SuspenseWrapper>
            </ErrorBoundary>
        </PageTransition>
    );
};

export default FII;