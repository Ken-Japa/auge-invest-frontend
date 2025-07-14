"use client";

import { useState } from 'react';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ViewMode } from './types';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton';
import { BdrContainer, ControlsWrapper } from './styled';
// Importando componentes do módulo BDR
import { BDRSearchBar, VisualizacaoBDRs } from '../../../components/BDR';
import { BDRTabs } from '../../../BDR/components/BDRTabs';
import { viewModeToVisualizationMode } from './utils';

export const Bdr = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('cartao');

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ErrorBoundary>
            <SuspenseWrapper
                fallback={<ContentSkeleton height={400} />}
            >
                <BdrContainer>
                    <ControlsWrapper>
                        <BDRTabs
                            viewMode={viewMode}
                            onChangeView={setViewMode}
                            onError={(message) => console.error(message)}
                        />
                        <BDRSearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSearch={(query) => {
                                setSearchQuery(query);
                            }}
                        />
                    </ControlsWrapper>

                    <VisualizacaoBDRs
                        mode={viewModeToVisualizationMode(viewMode)}
                        viewMode={viewMode}
                        onChangeView={(mode) => {
                            if (mode === 'cartao' || mode === 'tabela' || mode === 'grid') {
                                setViewMode(mode as ViewMode);
                            }
                        }}
                        filter={{
                            searchQuery: searchQuery
                        }}
                        onError={(message) => console.error(message)}
                    />
                </BdrContainer>
            </SuspenseWrapper>
        </ErrorBoundary>
    );
};