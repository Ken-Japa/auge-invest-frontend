"use client";

import { Container, Typography } from '@mui/material';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { PageBackground } from '@/components/Layout/PageBackground';
import { PageTransition } from '@/components/Utils/PageTransition';
import { useApi } from '@/providers/ApiProvider';

import { AddAlertButton } from './components/AddAlertButton';
import { AlertsTable } from './components/AlertsTable';
import { useAlerts } from './hooks/useAlerts';
import { ActionContainer,PageHeader } from './styled';

export const Alertas = () => {
    const { alerts, loading, error, refreshAlerts, toggleAlert, deleteAlert } = useAlerts();
    const { revalidateAlerts } = useApi();

    const handleDeleteAlert = async (alertId: string) => {
        await deleteAlert(alertId);
        revalidateAlerts();
    };

    const handleToggleAlert = async (alertId: string, field: 'recurring' | 'triggered', value: boolean) => {
        await toggleAlert(alertId, field, value);
        revalidateAlerts();
    };

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
                            <AddAlertButton refreshAlerts={refreshAlerts} />
                        </ActionContainer>

                        <SuspenseWrapper
                            fallback={
                                <ContentSkeleton
                                    type="card"
                                    cardHeight={400}
                                />
                            }
                        >
                            <ProgressiveLoad delay={0.2}>
                                <AlertsTable
                                    key={alerts.length}
                                    alerts={alerts}
                                    loading={loading}
                                    error={error}
                                    refreshAlerts={refreshAlerts}
                                    toggleAlert={handleToggleAlert}
                                    deleteAlert={handleDeleteAlert}
                                />
                            </ProgressiveLoad>
                        </SuspenseWrapper>
                    </Container>
                </PageBackground>
            </ErrorBoundary>
        </PageTransition>
    );
};