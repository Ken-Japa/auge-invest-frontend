"use client";

import { useState } from 'react';
import { Box } from "@mui/material";
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ViewMode } from '../../../components/EmpresaView/Elementos/ModoVisualizacao/types';
import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton';
import { ModoVisualizacao } from '../../../components/EmpresaView/Elementos/ModoVisualizacao';
import { SearchBar } from '../../../components/EmpresaView/Elementos/SearchBar';
import { VisualizationContent } from '../../../components/EmpresaView';
import { EmpresasContainer, ControlsWrapper, VisualizationWrapper, Title } from './styled';


export const Empresas = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('tabela');
    const [isLoading, setIsLoading] = useState(true);


    return (
        <ErrorBoundary>
            <SuspenseWrapper
                fallback={<ContentSkeleton height={400} />}
            >
                <EmpresasContainer>
                    <ControlsWrapper>
                        <ModoVisualizacao
                            viewMode={viewMode}
                            onChangeView={setViewMode}
                        />
                        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <Title>Empresas</Title>
                        </Box>
                        <SearchBar />
                    </ControlsWrapper>

                    <VisualizationWrapper>
                        <VisualizationContent
                            viewMode={viewMode}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    </VisualizationWrapper>

                </EmpresasContainer>
            </SuspenseWrapper>
        </ErrorBoundary>
    );
};