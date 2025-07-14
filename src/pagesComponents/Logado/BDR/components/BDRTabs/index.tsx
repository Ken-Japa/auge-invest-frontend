"use client";
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import VisualizacaoBDRs from '../../../components/BDR/components/Vizualização';
import { BDRTabsContainer } from '../../styled';
import { TabPanel } from '../TabPanel';
import { VisualizationMode } from '../../../components/BDR/types';

interface BDRTabsProps {
    onError: (message: string) => void;
}

export const BDRTabs: React.FC<BDRTabsProps> = ({ onError }) => {
    const [tabValue, setTabValue] = useState(0);
    const [viewMode, setViewMode] = useState<string>('cartao');

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        // Atualiza o modo de visualização com base na tab selecionada
        if (newValue === 0) setViewMode('cartao');
        else if (newValue === 1) setViewMode('tabela');
        else if (newValue === 2) setViewMode('grid');
    };

    const handleViewModeChange = (mode: string) => {
        setViewMode(mode);
        // Atualiza a tab com base no modo de visualização
        if (mode === 'cartao') setTabValue(0);
        else if (mode === 'tabela') setTabValue(1);
        else if (mode === 'grid') setTabValue(2);
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
                    viewMode={viewMode}
                    onChangeView={handleViewModeChange}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <VisualizacaoBDRs
                    mode="table"
                    filter={{}}
                    limit={20}
                    onError={onError}
                    viewMode={viewMode}
                    onChangeView={handleViewModeChange}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <VisualizacaoBDRs
                    mode="grid"
                    filter={{}}
                    limit={24}
                    onError={onError}
                    viewMode={viewMode}
                    onChangeView={handleViewModeChange}
                />
            </TabPanel>
        </BDRTabsContainer>
    );
};