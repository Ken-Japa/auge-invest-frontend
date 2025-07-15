"use client";

import { useState } from 'react';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ViewMode } from './types';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton';

// Importando componentes do módulo BDR
import { BDRSearchBar, VisualizacaoBDRs } from '../../../components/BDR';
import { BDRTabs } from '../../../BDR/components/BDRTabs';
import { useErrorHandling } from '../../../BDR/components/ErrorHandling';
import { viewModeToVisualizationMode } from './utils';
import { BdrContainer, ControlsWrapper, Title, ContentBox } from './styled';

export const Bdr = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('cartao');
    const { error, setError, clearError } = useErrorHandling();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        clearError();
        // If search functionality is needed in the future, implement it here
    };

    return (
        <ErrorBoundary>
            <SuspenseWrapper
                fallback={<ContentSkeleton height={400} />}
            >
                <BdrContainer>
                    <ControlsWrapper>
                        <Title>BDRs</Title>
                        <BDRSearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSearch={(query) => {
                                setSearchQuery(query);
                            }}
                        />
                    </ControlsWrapper>
                    <ContentBox>
                        <BDRTabs
                            onError={setError}
                            viewMode="cartao"
                            onChangeView={(view) => {
                                // Handle view mode change
                            }}
                            defaultPageSize={10}
                        />
                    </ContentBox>

                </BdrContainer>
            </SuspenseWrapper>
        </ErrorBoundary>
    );
};