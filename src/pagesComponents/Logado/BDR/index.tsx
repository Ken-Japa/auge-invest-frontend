"use client";
import { Alert, Snackbar } from '@mui/material';

import { useErrorHandling } from '@/components/Data-Display/ErrorHandling';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { PageBackground } from '@/components/Layout/PageBackground';
import { PageTransition } from '@/components/Utils/PageTransition';

import { BDRTabs } from './components/BDRTabs';
import {
    BDRSubTitle,
    BDRTitle,
    ContentBox,
    ContentWrapper,
} from './styled';

export const BDR = () => {
    const { error, setError, clearError } = useErrorHandling();


    return (
        <ErrorBoundary>
            <PageTransition direction="up" duration={0.4} distance={30}>
                <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <PageBackground imageName="BDRs">
                            <ContentWrapper maxWidth="xl">
                                <ContentBox>
                                    <BDRTitle variant="h2" gutterBottom>
                                        BDRs
                                    </BDRTitle>
                                    <BDRSubTitle>
                                        Recebíveis de Depósitos Brasileiros
                                    </BDRSubTitle>

                                    <Snackbar
                                        open={!!error}
                                        autoHideDuration={6000}
                                        onClose={clearError}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    >
                                        <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
                                            {error}
                                        </Alert>
                                    </Snackbar>

                                    <BDRTabs
                                        onError={setError}
                                        viewMode="cartao"
                                        onChangeView={(view) => {

                                        }}
                                        defaultPageSize={50}
                                    />
                                </ContentBox>
                            </ContentWrapper>
                        </PageBackground>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary>
    );
};

export default BDR;