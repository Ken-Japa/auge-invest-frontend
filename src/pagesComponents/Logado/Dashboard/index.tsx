"use client";

import { useSession } from 'next-auth/react';
import { Container } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';

import { PositionSection } from './components/PositionSection';
import { WalletSection } from './components/WalletSection';
import { BackgroundContainer, PageTitle, SectionContainer } from './styled';

export const Dashboard = () => {
    const { data: session } = useSession();

    return (
        <PageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <BackgroundContainer>
                    <Container maxWidth="xl">
                        <PageTitle variant="h2" >
                            Posição de {session?.user?.name}
                        </PageTitle>

                        <SectionContainer>
                            <SuspenseWrapper>
                                {/* Posições Reais */}
                                <ProgressiveLoad delay={0.2}>
                                    <PositionSection
                                        title="Posições Reais"
                                        type="real"
                                    />
                                </ProgressiveLoad>

                                {/* Posições Fictícias */}
                                <ProgressiveLoad delay={0.4}>
                                    <PositionSection
                                        title="Posições Fictícias"
                                        type="mock"
                                    />

                                <ProgressiveLoad delay={0.6}>
                                    <WalletSection
                                        title="Minhas Carteiras"
                                    />
                                </ProgressiveLoad>
                                </ProgressiveLoad>
                            </SuspenseWrapper>
                        </SectionContainer>
                    </Container>
                </BackgroundContainer>
            </ErrorBoundary>
        </PageTransition>
    );
};