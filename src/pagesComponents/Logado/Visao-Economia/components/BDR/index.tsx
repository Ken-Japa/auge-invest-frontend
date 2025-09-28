"use client";

import { useState } from 'react';

import { useErrorHandling } from '@/components/Data-Display/ErrorHandling';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';

import { BDRTabs } from '../../../BDR/components/BDRTabs';
// Importando componentes do módulo BDR
import { BDRSearchBar } from '../../../components/BDR';
import { BdrContainer, ContentBox,ControlsWrapper, Title } from './styled';

export const Bdr = () => {
    const { error, setError, clearError } = useErrorHandling();
    const [searchQuery, setSearchQuery] = useState('');



    return (
        <ErrorBoundary>
            <SuspenseWrapper
                fallback={<ContentSkeleton height={400} />}
            >
                <BdrContainer>
                    <ControlsWrapper>
                        <Title>BDRs</Title>
                        <BDRSearchBar />
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