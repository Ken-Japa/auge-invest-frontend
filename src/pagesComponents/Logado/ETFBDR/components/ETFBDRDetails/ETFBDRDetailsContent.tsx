import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ContentWrapper } from './styled';
import { ETFBDR } from '@/services/api/types/etfbdr';

interface ETFBDRDetailsContentProps {
  etf: ETFBDR;
  onBack: () => void;
}

export const ETFBDRDetailsContent: React.FC<ETFBDRDetailsContentProps> = ({ etf, onBack }) => (
  <ContentWrapper>
    <Typography variant="h4" gutterBottom>{etf.nomeETF}</Typography>
    <Typography variant="h6" color="textSecondary" gutterBottom>{etf.nomeCompletoETF}</Typography>
    <Box sx={{ mt: 4 }}>
      <Typography variant="body1"><strong>Código:</strong> {etf.codigoETF}</Typography>
      <Typography variant="body1"><strong>Indústria:</strong> {etf.industria}</Typography>
      <Typography variant="body1"><strong>Segmento:</strong> {etf.segmento}</Typography>
    </Box>
    <Button
      startIcon={<ArrowBackIcon />}
      variant="contained"
      onClick={onBack}
      sx={{ mt: 4 }}
    >
      Voltar
    </Button>
  </ContentWrapper>
);