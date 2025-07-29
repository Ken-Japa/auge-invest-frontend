"use client";

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { useErrorHandling } from '@/components/Data-Display/ErrorHandling';

// Importando componentes do módulo BDR
import FIISearchBar from '../../../components/FIIs/components/SearchBar';
import { FIITabs } from '../../../FII/components/FIITabs';
import { FiiContainer, ControlsWrapper, Title, ContentBox } from './styled';

export const Fii = () => {
    const { error, setError, clearError } = useErrorHandling();

    return (
        <ErrorBoundary>
            <SuspenseWrapper
                fallback={<ContentSkeleton height={400} />}
            >
                <FiiContainer>
                    <ControlsWrapper>
                        <Title>Fundos Imobiliários</Title>
                        <FIISearchBar />
                    </ControlsWrapper>
                    <ContentBox>
                        <FIITabs
                            onError={setError} defaultPageSize={20}
                        />
                    </ContentBox>

                </FiiContainer>
            </SuspenseWrapper>
        </ErrorBoundary>
    );
};