'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';
import { fetchETFBDRBySlugOrCode } from '@/pagesComponents/Logado/components/ETFBDR/services/etfbdrService';
import { ETFBDR } from '@/services/api/types/etfbdr';
import { formatCNPJ, formatNumber } from '@/components/Utils/Formatters/formatters';

const ETFBDRDetailPage = () => {
  const { slug } = useParams();
  const [etfbdr, setETFBDR] = useState<ETFBDR | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadETFBDR = async () => {
      if (slug) {
        try {
          setLoading(true);
          setError(null);
          const result = await fetchETFBDRBySlugOrCode(slug as string);
          setETFBDR(result);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      }
    };

    loadETFBDR();
  }, [slug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!etfbdr) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>ETFBDR não encontrado.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Detalhes do ETFBDR: {etfbdr.nomeCompletoETF || etfbdr.nomeETF || etfbdr.codigo}
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Nome Completo:</strong> {etfbdr.nomeCompletoETF}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Nome Curto:</strong> {etfbdr.nomeETF}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Código:</strong> {etfbdr.codigo}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Código CVM:</strong> {etfbdr.codigoCVM}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Indústria:</strong> {etfbdr.industria}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Segmento:</strong> {etfbdr.segmento}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Atividade:</strong> {etfbdr.atividade}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>CNPJ:</strong> {formatCNPJ(etfbdr.cnpj)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Status:</strong> {etfbdr.informacoes?.status}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Market Indicator:</strong> {etfbdr.informacoes?.marketIndicator}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Data Início:</strong> {etfbdr.informacoes?.dataInicio}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Tipo:</strong> {etfbdr.informacoes?.tipo}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Quota Count:</strong> {formatNumber(etfbdr.quotaCount)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1"><strong>Quota Date Approved:</strong> {etfbdr.quotaDateApproved}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ETFBDRDetailPage;