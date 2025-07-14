import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress, Button, Alert } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { fetchETFById } from '../../../components/ETF/services/etfsService';
import { ETFExtended } from '../../../components/ETF/types';
import { DetailPageContainer, ContentWrapper, LoadingContainer, ErrorContainer, BackButton } from './styled';

const ETFDetais: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [etf, setEtf] = useState<ETFExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadETF = async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await fetchETFById(id as string);
          setEtf(result);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido ao buscar o ETF.';
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      };
      loadETF();
    }
  }, [id]);

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
          <Typography variant="body1"><strong>Indústria:</strong> {etf.indústria}</Typography>
          <Typography variant="body1"><strong>Segmento:</strong> {etf.segmento}</Typography>
          <Typography variant="body1"><strong>CNPJ:</strong> {etf.informações?.cnpj}</Typography>
          <Typography variant="body1"><strong>Site:</strong> {etf.informações?.site}</Typography>
          <Typography variant="body1"><strong>Cotas:</strong> {etf.quotaCount}</Typography>
          <Typography variant="body1"><strong>Aprovado em:</strong> {etf.quotaDateApproved}</Typography>
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

export default ETFDetais;