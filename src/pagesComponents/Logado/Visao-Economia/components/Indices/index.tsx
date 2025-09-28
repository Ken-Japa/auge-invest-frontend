"use client";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton,Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';

import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton';
import { SearchDialog } from './components/Elementos/SearchDialog';
import {
    ChartContainer,
    CustomTab,
    IndicesContainer,
    TabActions,
    TabsContainer} from './styled';

interface IndexTab {
    id: string;
    name: string;
}

export const Indices = () => {
    const [tabs, setTabs] = useState<IndexTab[]>([{ id: 'IBOV', name: 'IBOVESPA' }]);
    const [activeTab, setActiveTab] = useState('IBOV');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleAddTab = (newIndex: IndexTab) => {
        setTabs([...tabs, newIndex]);
        setActiveTab(newIndex.id);
        setIsSearchOpen(false);
    };

    const handleCloseTab = (tabId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (tabs.length > 1) {
            const newTabs = tabs.filter(tab => tab.id !== tabId);
            setTabs(newTabs);
            if (activeTab === tabId) {
                setActiveTab(newTabs[0].id);
            }
        }
    };

    return (
        <SuspenseWrapper
            fallback={<ContentSkeleton height={400} />}
        >
            <IndicesContainer>
                <TabsContainer>
                    <Tabs
                        value={activeTab}
                        onChange={(_, value) => setActiveTab(value)}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {tabs.map(tab => (
                            <CustomTab
                                key={tab.id}
                                label={
                                    <TabActions>
                                        {tab.name}
                                        {tabs.length > 1 && (
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleCloseTab(tab.id, e)}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </TabActions>
                                }
                                value={tab.id}
                            />
                        ))}
                        <Tab
                            icon={<AddIcon />}
                            onClick={() => setIsSearchOpen(true)}
                            sx={{ minWidth: '48px' }}
                        />
                    </Tabs>
                    <IconButton onClick={() => setIsSearchOpen(true)}>
                        <SearchIcon />
                    </IconButton>
                </TabsContainer>

                <ChartContainer>
                    INDICES <br />
                    Gráfico será implementado quando a API estiver disponível
                </ChartContainer>

                <SearchDialog
                    open={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    onSelect={handleAddTab}
                />
            </IndicesContainer>
        </SuspenseWrapper>
    );
};