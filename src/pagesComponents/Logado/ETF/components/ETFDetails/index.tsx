"use client";
import { useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress, Alert, Chip } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DetailPageContainer, ContentWrapper, LoadingContainer, ErrorContainer, BackButton, Header, NomeETF, SubHeader, BoxContent, BoxHeader, BoxBody } from './styled';
import { useETFDetails } from './hooks/useETFDetails';
import { formatCNPJ, formatNumber, formatLink } from '@/components/Utils/Formatters/formatters';

interface ETFDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

const ETFDetails = ({ slug, codigo, isCode = false }: ETFDetailsProps) => {
  const router = useRouter();
  const { etf, loading, error } = useETFDetails({ slug, codigo, isCode });


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
        <Header>
          <NomeETF>
            <Typography variant="h3" gutterBottom>{etf.nomeETF}</Typography>
          </NomeETF>
          <Typography variant="h5" color="textSecondary" gutterBottom>{etf.nomeCompletoETF}</Typography>
          <SubHeader >
            <Typography variant="body1">Aprovação: {etf.quotaDateApproved}</Typography>
            <Chip
              label={etf.codigo || 'N/A'}
              size="medium"
              color="success"
              variant="outlined"
              clickable
            />
          </SubHeader>
        </Header>

        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} mt={4}>
          <Box>
            <BoxHeader>
              <Typography variant="h4" gutterBottom >Informações básicas</Typography>
            </BoxHeader>
            <BoxContent>
              <BoxBody>
                <Typography variant="body1"><strong>Cotas disponíveis:</strong></Typography>
                <Typography variant="body1">{formatNumber(etf.quotaCount)}</Typography>
              </BoxBody>
              <BoxBody>
                <Typography variant="body1"><strong>Indústria:</strong></Typography>
                <Typography variant="body1">{etf.indústria}</Typography>
              </BoxBody>
              <BoxBody>
                <Typography variant="body1"><strong>Segmento:</strong></Typography>
                <Typography variant="body1">{etf.segmento}</Typography>
              </BoxBody>

            </BoxContent>
          </Box>

          <Box>
            <BoxHeader>
              <Typography variant="h4" gutterBottom >Detalhes</Typography>
            </BoxHeader>
            <BoxContent>
              <BoxBody>
                <Typography variant="body1"><strong>CNPJ:</strong></Typography>
                <Typography variant="body1">{formatCNPJ(etf.informações?.cnpj || '')}</Typography>
              </BoxBody>
              <BoxBody>
                <Typography variant="body1"><strong>Site:</strong></Typography>
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: formatLink(etf.informações?.site, 'Acessar Link') }} />
              </BoxBody>


            </BoxContent>
          </Box>
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