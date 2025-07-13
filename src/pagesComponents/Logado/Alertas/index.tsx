"use client";

import { Container, Typography } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { PageBackground } from '@/components/Layout/PageBackground';

import { AlertsTable } from './components/AlertsTable';
import { AddAlertButton } from './components/AddAlertButton';
import { PageHeader, ActionContainer } from './styled';

export const Alertas = () => {
    return (
        <PageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <PageBackground imageName="Alertas" opacity={0.2}>
                    <Container maxWidth="xl">
                        <PageHeader>
                            <Typography variant="h2" component="h1">
                                Alertas de Preço
                            </Typography>
                        </PageHeader>

                        <ActionContainer>
                            <AddAlertButton />
                        </ActionContainer>

                        <SuspenseWrapper
                            fallback={
                                <ContentSkeleton
                                    type="card"
                                    cardHeight={400}
                                    className="mt-4"
                                />
                            }
                        >
                            <ProgressiveLoad delay={0.2}>
                                <AlertsTable />
                            </ProgressiveLoad>
                        </SuspenseWrapper>
                    </Container>
                </PageBackground>
            </ErrorBoundary>
        </PageTransition>
    );
};