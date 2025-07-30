"use client";

import { useState } from 'react';
import { Container, Alert, Snackbar } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { PageBackground } from '@/components/Layout/PageBackground';
import { AppearanceSettings } from './components/AppearanceSettings/index';
import { NotificationSettings } from './components/NotificationSettings/index';
import { AlertPreferences } from './components/AlertPreferences/index';
import { useSettings } from './hooks/useSettings';
import { SettingsTitle } from './styled';

export const Configuracoes = () => {
    const {
        settings,
        error,
        updateNotifications,
        updatePercentages
    } = useSettings();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' as 'success' | 'error' });

    const handleNotificationChange = (type: keyof typeof settings.notifications) => async (e: React.ChangeEvent<HTMLInputElement>) => {
        const success = await updateNotifications(type, e.target.checked);
        setSnackbar({
            open: true,
            message: success ? 'Configurações atualizadas' : 'Erro ao atualizar configurações',
            type: success ? 'success' : 'error'
        });
    };

    const handlePercentageChange = (type: 'buy' | 'sell') => async (event: Event, newValue: number | number[]) => {
        const success = await updatePercentages(type, newValue as number);
        setSnackbar({
            open: true,
            message: success ? 'Configurações atualizadas' : 'Erro ao atualizar configurações',
            type: success ? 'success' : 'error'
        });
    };

    if (error) {
        return (
            <PageBackground imageName="Configuracoes">
                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Alert severity="error">{error}</Alert>
                </Container>
            </PageBackground>
        );
    }

    return (
        <ErrorBoundary>
            <PageTransition direction="up" duration={0.4} distance={30}>
                <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <PageBackground imageName="Configuracoes">
                            <Container maxWidth="md" sx={{ py: 4 }}>
                                <SettingsTitle variant="h2" >
                                    Configurações
                                </SettingsTitle>

                                <SuspenseWrapper fallback={<ContentSkeleton type="form" formFields={1} />}>
                                    <ProgressiveLoad delay={0.2}>
                                        <AppearanceSettings />
                                    </ProgressiveLoad>
                                </SuspenseWrapper>

                                <SuspenseWrapper fallback={<ContentSkeleton type="form" formFields={3} />}>
                                    <ProgressiveLoad delay={0.4}>
                                        <NotificationSettings
                                            notifications={settings.notifications}
                                            onNotificationChange={handleNotificationChange}
                                        />
                                    </ProgressiveLoad>
                                </SuspenseWrapper>

                                <SuspenseWrapper fallback={<ContentSkeleton type="form" formFields={2} />}>
                                    <ProgressiveLoad delay={0.6}>
                                        <AlertPreferences
                                            percentages={settings.defaultPercentages}
                                            onPercentageChange={handlePercentageChange}
                                        />
                                    </ProgressiveLoad>
                                </SuspenseWrapper>
                                <Snackbar
                                    open={snackbar.open}
                                    autoHideDuration={3000}
                                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                                >
                                    <Alert severity={snackbar.type} sx={{ width: '100%' }}>
                                        {snackbar.message}
                                    </Alert>
                                </Snackbar>
                            </Container>
                        </PageBackground>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary>
    );
};