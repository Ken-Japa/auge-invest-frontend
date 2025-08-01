import React from 'react';
import { CircularProgress } from '@mui/material';
import { LoadingContainer } from '../styled';

export const ETFBDRLoading: React.FC = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
);