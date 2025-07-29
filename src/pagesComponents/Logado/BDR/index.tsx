"use client";
import { Alert, Snackbar } from '@mui/material';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { useErrorHandling } from '@/components/Data-Display/ErrorHandling';
import BDRSearchBar from '../components/BDR/components/SearchBar';
import { BDRTabs } from './components/BDRTabs';
import {
    BDRPageContainer,
    ContentWrapper,
    ContentBox,
    BDRTitle,
    BDRSubTitle,
    SearchBox
} from './styled';

export const BDR = () => {
    const { error, setError, clearError } = useErrorHandling();


    return (
        <PageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <SuspenseWrapper>
                    <BDRPageContainer>
                        <ContentWrapper maxWidth="xl">
                            <ContentBox>
                                <BDRTitle variant="h2" gutterBottom>
                                    BDRs
                                </BDRTitle>
                                <BDRSubTitle>
                                    Recebíveis de Depósitos Brasileiros
                                </BDRSubTitle>

                                <SearchBox >
                                    <BDRSearchBar />
                                </SearchBox>

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
                    </BDRPageContainer>
                </SuspenseWrapper>
            </ErrorBoundary>
        </PageTransition>
    );
};

export default BDR;