"use client";
import { Box, Alert, Snackbar } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { FIISearchBar } from '../components/FIIs/components/SearchBar';
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

    const handleSearch = (query: string) => {
        clearError();
        // If search functionality is needed in the future, implement it here
    };

    return (
        <PageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <SuspenseWrapper>
                    <FIIPageContainer>
                        <ContentWrapper maxWidth="xl">
                            <ContentBox>
                                <FIITitle variant="h2" gutterBottom>
                                    Fundos Imobiliários
                                </FIITitle>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                                    <FIISearchBar onSearch={handleSearch} />
                                </Box>

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
                </SuspenseWrapper>
            </ErrorBoundary>
        </PageTransition>
    );
};

export default FII;