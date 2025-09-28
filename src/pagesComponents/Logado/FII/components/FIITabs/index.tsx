"use client";
import { Tab,Tabs } from '@mui/material';
import React, { useState } from 'react';

import { TabPanel } from '@/components/Data-Display/TabPanel';
import { ETFFilter } from '@/services/api/types/etf';

import { VisualizacaoFIIs } from '../../../components/FIIs/components/Vizualização';
import { FIITabsContainer } from '../../styled';

interface FIITabsProps {
    defaultPageSize?: number;
    onError: (message: string) => void;
}

export const FIITabs: React.FC<FIITabsProps> = ({ defaultPageSize, onError }) => {
    const [tabValue, setTabValue] = useState(0);
    const [filters, setFilters] = useState<ETFFilter>({});

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
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
                    filters={filters}
                    defaultPageSize={defaultPageSize}
                    onError={onError}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <VisualizacaoFIIs
                    mode="table"
                    filters={filters}
                    defaultPageSize={defaultPageSize}
                    onError={onError}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <VisualizacaoFIIs
                    mode="grid"
                    filters={filters}
                    defaultPageSize={defaultPageSize}
                    onError={onError}
                />
            </TabPanel>
        </FIITabsContainer>
    );
};