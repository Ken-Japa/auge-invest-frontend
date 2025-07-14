import { Alert } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DetailPageContainer, ContentWrapper, ErrorContainer, BackButton } from '../../styled';

interface NotFoundStateProps {
  onBack: () => void;
}

export const NotFoundState = ({ onBack }: NotFoundStateProps) => (
  <DetailPageContainer>
    <ContentWrapper>
      <ErrorContainer>
        <Alert severity="warning" sx={{ mb: 2 }}>
          BDR não encontrado
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