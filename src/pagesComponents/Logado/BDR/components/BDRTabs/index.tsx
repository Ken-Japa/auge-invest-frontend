"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import VisualizacaoBDRs from '../../../components/BDR/components/Vizualização';
import { BDRTabsContainer } from '../../styled';
import { TabPanel } from '../TabPanel';
import { VisualizationMode } from '../../../components/BDR/types';

interface BDRTabsProps {
    viewMode: string;
    onChangeView: (mode: string) => void;
    onError: (message: string) => void;
}

export const BDRTabs: React.FC<BDRTabsProps> = ({ viewMode, onChangeView, onError }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        // Atualiza o modo de visualização com base na tab selecionada
        if (newValue === 0) onChangeView('cartao');
        else if (newValue === 1) onChangeView('tabela');
        else if (newValue === 2) onChangeView('grid');
    };

    // Use useEffect to update tabValue when viewMode changes externally
    useEffect(() => {
        if (viewMode === 'cartao') setTabValue(0);
        else if (viewMode === 'tabela') setTabValue(1);
        else if (viewMode === 'grid') setTabValue(2);
    }, [viewMode]);

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

                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <VisualizacaoBDRs
                    mode="table"
                    filter={{}}
                    limit={20}
                    onError={onError}
                    viewMode={viewMode}

                />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <VisualizacaoBDRs
                    mode="grid"
                    filter={{}}
                    limit={24}
                    onError={onError}
                    viewMode={viewMode}

                />
            </TabPanel>
        </BDRTabsContainer>
    );
}
