"use client";
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { VisualizacaoFIIs } from '../../../components/FIIs/components/Vizualização';
import { FIITabsContainer } from '../../styled';
import { TabPanel } from '../TabPanel';

interface FIITabsProps {
    onError: (message: string) => void;
}

export const FIITabs: React.FC<FIITabsProps> = ({ onError }) => {
    const [tabValue, setTabValue] = useState(0);

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
                    filter={{}}
                    limit={12}
                    onError={onError}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <VisualizacaoFIIs
                    mode="table"
                    filter={{}}
                    limit={20}
                    onError={onError}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <VisualizacaoFIIs
                    mode="grid"
                    filter={{}}
                    limit={24}
                    onError={onError}
                />
            </TabPanel>
        </FIITabsContainer>
    );
};