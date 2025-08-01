import React from 'react';
import { Typography } from '@mui/material';
import { EmptyResultsContainer } from '../styled';

export const ETFBDRNotFound: React.FC = () => (
  <EmptyResultsContainer>
    <Typography>Nenhum ETFBDR encontrado com os filtros aplicados.</Typography>
  </EmptyResultsContainer>
);