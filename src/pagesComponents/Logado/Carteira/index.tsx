"use client";

import { useSession } from 'next-auth/react';
import { Container } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { RecentActivitiesProvider } from './context/RecentActivitiesContext';
import { FocusProvider } from './components/RecentActivities/components/FocusContext/FocusContext';
import { PageBackground } from '@/components/Layout/PageBackground';

import { PositionSection } from './components';
import { WalletSection } from './components/WalletSection';
import { PageTitle, SectionContainer } from './styled';

export const Dashboard = () => {
    const { data: session } = useSession();

    return (
        <PageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <PageBackground imageName="Dashboard">
                    <Container maxWidth="xl">
                        <PageTitle variant="h2" >
                            Posição de {session?.user?.name}
                        </PageTitle>
                        <RecentActivitiesProvider>
                            <FocusProvider>
                                <SectionContainer>
                                    <SuspenseWrapper>
                                        {/* Posições Reais */}
                                        <ProgressiveLoad delay={0.2}>
                                            <PositionSection
                                                title="Posições Reais"
                                                type="real"
                                            />
                                        </ProgressiveLoad>

                                        <ProgressiveLoad delay={0.6}>
                                            <WalletSection
                                                title="Minhas Carteiras"
                                                isSimulated={false}
                                            />
                                        </ProgressiveLoad>

                                    </SuspenseWrapper>
                                </SectionContainer>

                                <SectionContainer>
                                    <SuspenseWrapper>
                                        {/* Posições Simuladas */}
                                        <ProgressiveLoad delay={0.2}>
                                            <PositionSection
                                                title="Simulações"
                                                type="virtual"
                                            />
                                        </ProgressiveLoad>

                                        <ProgressiveLoad delay={0.6}>
                                            <WalletSection
                                                title="Simulações"
                                                isSimulated={true}
                                            />
                                        </ProgressiveLoad>

                                    </SuspenseWrapper>
                                </SectionContainer>
                            </FocusProvider>
                        </RecentActivitiesProvider>
                    </Container>
                </PageBackground>
            </ErrorBoundary>
        </PageTransition>
    );
};