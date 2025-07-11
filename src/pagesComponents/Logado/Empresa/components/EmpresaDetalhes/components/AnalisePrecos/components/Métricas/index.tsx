import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { StatisticalData } from '../../services/analiseService';

interface MetricasProps {
  stats: StatisticalData;
}

const Metricas: React.FC<MetricasProps> = ({ stats }) => {
  const { mean, stdDev, min, max } = stats;

  return (
    <Grid container spacing={2} sx={{ my: 4 }}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">Preço Médio</Typography>
          <Typography variant="h4">R$ {mean.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">Desvio Padrão σ </Typography>
          <Typography variant="h4">R$ {stdDev.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">Preço Mínimo</Typography>
          <Typography variant="h4">R$ {min.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">Preço Máximo</Typography>
          <Typography variant="h4">R$ {max.toFixed(2)}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Metricas;