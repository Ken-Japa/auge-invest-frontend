import { CircularProgress } from '@mui/material';
import React from 'react';

import { LoadingContainer } from '../styled';

export const ETFBDRLoadingState: React.FC = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
);