"use client";

import { useState } from 'react';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ViewMode } from './types';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton';
import { BdrContainer, VisualizationWrapper, ControlsWrapper } from './styled';
// Importando componentes do módulo BDR
import { BDRSearchBar, VisualizacaoBDRs } from '../../../components/BDR';
import { BDRTabs } from '../../../BDR/components/BDRTabs';
import { visualizationModeToViewMode } from './utils';

export const Bdr = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('cartao');
    const [isLoading, setIsLoading] = useState(true);
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
                                // Resetar o loading para forçar uma nova busca
                                setIsLoading(true);
                            }}
                        />
                    </ControlsWrapper>

                    <VisualizationWrapper>
                        <VisualizacaoBDRs
                            mode={viewModeToVisualizationMode(viewMode)}
                            viewMode={viewMode}
                            onChangeView={(mode) => {
                                // Se o modo for um dos modos de visualização válidos, atualize o estado
                                if (mode === 'cartao' || mode === 'tabela' || mode === 'grid') {
                                    setViewMode(mode as ViewMode);
                                }
                            }}
                            filter={{
                                searchQuery: searchQuery
                            }}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            onError={(message) => console.error(message)}
                        />
                    </VisualizationWrapper>

                </BdrContainer>
            </SuspenseWrapper>
        </ErrorBoundary>
    );
};