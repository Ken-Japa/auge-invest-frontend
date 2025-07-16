"use client";

import { useState } from 'react';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { useErrorHandling } from '@/components/Data-Display/ErrorHandling';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';

// Importando componentes do módulo BDR
import { BDRSearchBar } from '../../../components/BDR';
import { BDRTabs } from '../../../BDR/components/BDRTabs';
import { BdrContainer, ControlsWrapper, Title, ContentBox } from './styled';

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