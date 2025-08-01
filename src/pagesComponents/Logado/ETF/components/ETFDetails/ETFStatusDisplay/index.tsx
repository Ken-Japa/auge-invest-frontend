import { Alert, CircularProgress, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { BackButton, ContentWrapper, DetailPageContainer, ErrorContainer, LoadingContainer } from './styled';

interface ETFStatusDisplayProps {
  loading: boolean;
  error: string | null;
  onBack: () => void;
}

const ETFStatusDisplay = ({ loading, error, onBack }: ETFStatusDisplayProps) => {
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
              onClick={onBack}
            >
              Voltar
            </BackButton>
          </ErrorContainer>
        </ContentWrapper>
      </DetailPageContainer>
    );
  }

  return null;
};

export default ETFStatusDisplay;