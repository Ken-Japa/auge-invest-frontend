import { Grid } from '@mui/material';
import React from 'react';

import { useETFCardLogic } from '../../../hooks/useETFCardLogic';
import { ETFExtended } from '../../../types';
import ETFCard from './ETFCard';

interface CardViewProps {
  etfs: ETFExtended[];
}

const CardView: React.FC<CardViewProps> = ({ etfs }) => {
  const { sortedEtfs, handleCardClick } = useETFCardLogic(etfs);

  return (
    <Grid container spacing={3}>
      {sortedEtfs.map((etf) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etf._id}>
          <ETFCard etf={etf} handleCardClick={handleCardClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;