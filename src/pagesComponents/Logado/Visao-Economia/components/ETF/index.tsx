"use client";

import { useState } from 'react';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ViewMode } from './types';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ContentSkeleton } from '../../../../../components/Feedback/Skeletons/ContentSkeleton';

// Importando componentes do módulo BDR
import { SearchBar } from '../../../components/ETF/components/SearchBar';
import ETF from '../../../components/ETF'
import { BDRTabs } from '../../../BDR/components/BDRTabs';

import { BdrContainer, ControlsWrapper, Title, ContentBox } from './styled';

export const Etf = () => {

    const [searchQuery, setSearchQuery] = useState('');



    return (
        <ErrorBoundary>
            <SuspenseWrapper
                fallback={<ContentSkeleton height={400} />}
            >
                <BdrContainer>
                    <ControlsWrapper>
                        <Title>ETFs</Title>
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}

                        />
                    </ControlsWrapper>
                    <ContentBox>
                        <ETF />
                    </ContentBox>

                </BdrContainer>
            </SuspenseWrapper>
        </ErrorBoundary>
    );
};