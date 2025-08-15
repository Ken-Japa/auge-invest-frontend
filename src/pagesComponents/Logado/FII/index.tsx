"use client";
import { Box, Alert, Snackbar } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import FIISearchBar from '../components/FIIs/components/SearchBar';
import { useErrorHandling } from '@/components/Data-Display/ErrorHandling';
import { FIITabs } from './components/FIITabs';
import {
    FIIPageContainer,
    ContentWrapper,
    ContentBox,
    FIITitle,
} from './styled';

export const FII = () => {
    const { error, setError, clearError } = useErrorHandling();


    return (
        <ErrorBoundary>
            <PageTransition direction="up" duration={0.4} distance={30}>

                <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <FIIPageContainer>
                            <ContentWrapper maxWidth="xl">
                                <ContentBox>
                                    <FIITitle variant="h2" gutterBottom>
                                        Fundos Imobiliários
                                    </FIITitle>


                                    <FIISearchBar />


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

                                    <FIITabs onError={setError} defaultPageSize={50} />
                                </ContentBox>
                            </ContentWrapper>
                        </FIIPageContainer>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary>
    );
};

export default FII;