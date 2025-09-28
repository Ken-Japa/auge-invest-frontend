import { Typography } from '@mui/material';
import React from 'react';

import { EmptyResultsContainer } from '../styled';

export const ETFBDRNotFound: React.FC = () => (
  <EmptyResultsContainer>
    <Typography>Nenhum ETFBDR encontrado com os filtros aplicados.</Typography>
  </EmptyResultsContainer>
);