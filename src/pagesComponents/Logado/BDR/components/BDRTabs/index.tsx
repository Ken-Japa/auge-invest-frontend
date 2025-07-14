"use client";
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { VisualizacaoBDRs } from '../../../components/BDR/components/Vizualização';
import { BDRTabsContainer } from '../../styled';
import { TabPanel } from '../TabPanel';

interface BDRTabsProps {
    onError: (message: string) => void;
}

export const BDRTabs: React.FC<BDRTabsProps> = ({ onError }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <BDRTabsContainer>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="Modos de visualização de BDRs"
                centered
            >
                <Tab label="Cartões" />
                <Tab label="Tabela" />
                <Tab label="Grade" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <VisualizacaoBDRs
                    mode="card"
                    filter={{}}
                    limit={12}
                    onError={onError}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <VisualizacaoBDRs
                    mode="table"
                    filter={{}}
                    limit={20}
                    onError={onError}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <VisualizacaoBDRs
                    mode="grid"
                    filter={{}}
                    limit={24}
                    onError={onError}
                />
            </TabPanel>
        </BDRTabsContainer>
    );
};