"use client";
import { Box, Alert, Snackbar } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { BDRSearchBar } from '../components/BDRs/components/SearchBar';
import { useErrorHandling } from './components/ErrorHandling';
import { BDRTabs } from './components/BDRTabs';
import {
    BDRPageContainer,
    ContentWrapper,
    ContentBox,
    BDRTitle,
} from './styled';

export const BDR = () => {
    const { error, setError, clearError } = useErrorHandling();

    const handleSearch = (query: string) => {
        clearError();
        // If search functionality is needed in the future, implement it here
    };

    return (
        <PageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <SuspenseWrapper>
                    <BDRPageContainer>
                        <ContentWrapper maxWidth="xl">
                            <ContentBox>
                                <BDRTitle variant="h2" gutterBottom>
                                    Fundos Imobiliários
                                </BDRTitle>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                                    <BDRSearchBar onSearch={handleSearch} />
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

                                <BDRTabs onError={setError} />
                            </ContentBox>
                        </ContentWrapper>
                    </BDRPageContainer>
                </SuspenseWrapper>
            </ErrorBoundary>
        </PageTransition>
    );
};

export default BDR;