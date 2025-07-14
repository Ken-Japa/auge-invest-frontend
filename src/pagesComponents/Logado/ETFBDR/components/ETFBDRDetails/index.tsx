"use client";
import { useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DetailPageContainer, ContentWrapper, LoadingContainer, ErrorContainer, BackButton } from './styled';
import { useETFBDRDetails } from './hooks/useETFBDRDetails';


interface ETFBDRDetailsProps {
    slug: string;
    codigo?: string;
    isCode?: boolean;
}

const ETFDetails = ({ slug, codigo, isCode = false }: ETFBDRDetailsProps) => {
    const router = useRouter();
    const { etf, loading, error } = useETFBDRDetails({ slug, codigo, isCode });


    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <DetailPageContainer>
                <ContentWrapper>
                    <ErrorContainer>
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                        <BackButton
                            startIcon={<ArrowBackIcon />}
                            variant="contained"
                            onClick={handleBack}
                        >
                            Voltar
                        </BackButton>
                    </ErrorContainer>
                </ContentWrapper>
            </DetailPageContainer>
        );
    }

    if (!etf) {
        return (
            <DetailPageContainer>
                <ContentWrapper>
                    <ErrorContainer>
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            ETF não encontrado.
                        </Alert>
                        <BackButton
                            startIcon={<ArrowBackIcon />}
                            variant="contained"
                            onClick={handleBack}
                        >
                            Voltar
                        </BackButton>
                    </ErrorContainer>
                </ContentWrapper>
            </DetailPageContainer>
        );
    }

    return (
        <DetailPageContainer>
            <ContentWrapper>
                <Typography variant="h4" gutterBottom>{etf.nomeETF}</Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>{etf.nomeCompletoETF}</Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1"><strong>Código:</strong> {etf.codigo}</Typography>
                    <Typography variant="body1"><strong>Indústria:</strong> {etf.industria}</Typography>
                    <Typography variant="body1"><strong>Segmento:</strong> {etf.segmento}</Typography>
                </Box>
                <BackButton
                    startIcon={<ArrowBackIcon />}
                    variant="contained"
                    onClick={handleBack}
                    sx={{ mt: 4 }}
                >
                    Voltar
                </BackButton>
            </ContentWrapper>
        </DetailPageContainer>
    );
};

export default ETFDetails;