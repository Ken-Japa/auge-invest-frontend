import { Typography } from '@mui/material';
import React from 'react';

interface FIIDescriptionProps {
  description?: string;
}

const FIIDescription: React.FC<FIIDescriptionProps> = ({ description }) => (
  <>
    <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
      Descrição
    </Typography>
    <Typography variant="body1" component="div">
      {description || 'Não há descrição disponível para este FII.'}
    </Typography>
  </>
);

export default FIIDescription;