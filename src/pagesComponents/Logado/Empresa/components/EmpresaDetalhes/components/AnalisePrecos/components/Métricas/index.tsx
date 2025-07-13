import React from 'react';
import { Grid } from '@mui/material';
import { StatisticalData } from '../../utils/types';
import { MetricasContainer, MetricCard, MetricTitle, MetricValue } from './styled';

interface MetricasProps {
  stats: StatisticalData;
}

const Metricas: React.FC<MetricasProps> = ({ stats }) => {
  const { mean, stdDev, min, max } = stats;

  return (
    <MetricasContainer container spacing={2}>
      <Grid item xs={12} md={3}>
        <MetricCard>
          <MetricTitle variant="subtitle1">Preço Médio</MetricTitle>
          <MetricValue variant="h4">R$ {mean.toFixed(2)}</MetricValue>
        </MetricCard>
      </Grid>
      <Grid item xs={12} md={3}>
        <MetricCard>
          <MetricTitle variant="subtitle1">Desvio Padrão σ</MetricTitle>
          <MetricValue variant="h4">R$ {stdDev.toFixed(2)}</MetricValue>
        </MetricCard>
      </Grid>
      <Grid item xs={12} md={3}>
        <MetricCard>
          <MetricTitle variant="subtitle1">Preço Mínimo</MetricTitle>
          <MetricValue variant="h4">R$ {min.toFixed(2)}</MetricValue>
        </MetricCard>
      </Grid>
      <Grid item xs={12} md={3}>
        <MetricCard>
          <MetricTitle variant="subtitle1">Preço Máximo</MetricTitle>
          <MetricValue variant="h4">R$ {max.toFixed(2)}</MetricValue>
        </MetricCard>
      </Grid>
    </MetricasContainer>
  );
};

export default Metricas;