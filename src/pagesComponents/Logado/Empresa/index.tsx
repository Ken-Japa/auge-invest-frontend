"use client";

import { Box } from '@mui/material';
import { useState } from 'react';

// Componentes compartilhados
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { PageBackground } from '@/components/Layout/PageBackground';
import { PageTransition } from '@/components/Utils/PageTransition';

import { VisualizationContent } from '../components/EmpresaView';
import { ModoVisualizacao } from '../components/EmpresaView/Elementos/ModoVisualizacao';
import { ViewMode } from '../components/EmpresaView/Elementos/ModoVisualizacao/types';
// Componentes específicos
import { SearchBar } from '../components/EmpresaView/Elementos/SearchBar';
// Estilos
import {
    ContentContainer,
    ControlsWrapper,
    SearchBarWrapper} from './styled';

export const Empresa = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('neural');

    return (
        <ErrorBoundary>
            <PageTransition>
                <SuspenseWrapper fallback={<ContentSkeleton height={600} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <PageBackground imageName="Empresas">
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <SearchBarWrapper>
                                    <SearchBar />
                                </SearchBarWrapper>

                                <ContentContainer>
                                    <ControlsWrapper>
                                        <ModoVisualizacao
                                            viewMode={viewMode}
                                            onChangeView={setViewMode}
                                        />
                                    </ControlsWrapper>

                                    <VisualizationContent
                                        viewMode={viewMode}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                </ContentContainer>
                            </Box>
                        </PageBackground>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary >
    );
};