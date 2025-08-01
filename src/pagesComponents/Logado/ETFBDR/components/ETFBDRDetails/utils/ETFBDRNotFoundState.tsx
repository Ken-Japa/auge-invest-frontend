import React from 'react';
import { Alert, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DetailPageContainer, ContentWrapper, ErrorContainer } from '../styled';

interface ETFBDRNotFoundStateProps {
  message: string;
  onBack: () => void;
}

export const ETFBDRNotFoundState: React.FC<ETFBDRNotFoundStateProps> = ({ message, onBack }) => (
  <DetailPageContainer>
    <ContentWrapper>
      <ErrorContainer>
        <Alert severity="warning" sx={{ mb: 2 }}>
          {message}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={onBack}
        >
          Voltar
        </Button>
      </ErrorContainer>
    </ContentWrapper>
  </DetailPageContainer>
);