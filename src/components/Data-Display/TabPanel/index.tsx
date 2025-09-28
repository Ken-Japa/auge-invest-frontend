"use client";
import React from 'react';

import { TabPanelContainer } from '../../../pagesComponents/Logado/BDR/styled';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`bdr-tabpanel-${index}`}
            aria-labelledby={`bdr-tab-${index}`}
            {...other}
        >
            {value === index && <TabPanelContainer>{children}</TabPanelContainer>}
        </div>
    );
};