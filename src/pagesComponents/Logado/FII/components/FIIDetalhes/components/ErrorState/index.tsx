import { Alert } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DetailPageContainer, ContentWrapper, ErrorContainer, BackButton } from '../../styled';

interface ErrorStateProps {
  error: string;
  onBack: () => void;
}

export const ErrorState = ({ error, onBack }: ErrorStateProps) => (
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