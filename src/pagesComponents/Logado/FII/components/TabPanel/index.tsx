"use client";
import React from 'react';
import { TabPanelContainer } from '../../styled';

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
            id={`fii-tabpanel-${index}`}
            aria-labelledby={`fii-tab-${index}`}
            {...other}
        >
            {value === index && <TabPanelContainer>{children}</TabPanelContainer>}
        </div>
    );
};