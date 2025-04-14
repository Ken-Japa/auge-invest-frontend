"use client";

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { PageTransition } from '@/components/Utils/PageTransition';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';

// Componentes da página - Carregando os componentes principais imediatamente
import { Empresas } from './components/Empresas';
import { Indices } from './components/Indices';
import { Bdr } from './components/BDR';
import { Selic } from './components/Outros/Selic';
import { Inflacao } from './components/Outros/Inflacao';
import { PosicaoUsuario } from './components/Outros/PosicaoUsuario';

// Componentes secundários carregados com lazy
const Moedas = lazy(() => import('./components/Outros/Moedas').then(mod => ({ default: mod.Moedas })));
const Commodities = lazy(() => import('./components/Outros/Commodities').then(mod => ({ default: mod.Commodities })));
const Debentures = lazy(() => import('./components/Outros/Debentures').then(mod => ({ default: mod.Debentures })));
const Calendario = lazy(() => import('../components/Calendario').then(mod => ({ default: mod.Calendario })));

import { BackgroundContainer, DashboardItem } from './styled';

export const VisaoEconomia = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const measureElements = () => {
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');

            if (header) {
                setHeaderHeight(header.offsetHeight);
            }

            if (footer) {
                setFooterHeight(footer.offsetHeight);
            }
        };
        measureElements();
        const timer = setTimeout(measureElements, 300);

        window.addEventListener('resize', measureElements);

        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => {
            clearTimeout(timer);
            clearTimeout(loadTimer);
            window.removeEventListener('resize', measureElements);
        };
    }, []);

    return (
        <ErrorBoundary>
            <PageTransition direction="up" duration={0.4} distance={30}>
                <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <BackgroundContainer
                            style={{
                                paddingTop: `${headerHeight}px`,
                                paddingBottom: `${footerHeight}px`,
                                minHeight: '100vh'
                            }}
                        >
                            <Container
                                maxWidth="xl"
                                sx={{
                                    py: 4,
                                    opacity: isLoading ? 0.8 : 1,
                                    transition: 'opacity 0.3s ease-in-out'
                                }}
                            >
                                <Grid container spacing={3}>
                                    {/* Coluna Esquerda - 8/12 da largura */}
                                    <Grid item xs={12} lg={8}>
                                        <Grid container spacing={3}>
                                            {/* Componente de Ações */}
                                            <Grid item xs={12}>
                                                <DashboardItem>
                                                    <Empresas />
                                                </DashboardItem>
                                            </Grid>

                                            {/* Componente de Índices de Mercado */}
                                            <Grid item xs={12}>
                                                <DashboardItem>
                                                    <Indices />
                                                </DashboardItem>
                                            </Grid>

                                            {/* Componente de BDRs */}
                                            <Grid item xs={12}>
                                                <DashboardItem>
                                                    <Bdr />
                                                </DashboardItem>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* Coluna Direita - 4/12 da largura */}
                                    <Grid item xs={12} lg={4}>
                                        <Grid container spacing={3}>
                                            {/* Posição do Usuário */}
                                            <Grid item xs={12} sm={6} lg={12}>
                                                <DashboardItem>
                                                    <PosicaoUsuario />
                                                </DashboardItem>
                                            </Grid>

                                            {/* Taxa Selic */}
                                            <Grid item xs={12} sm={6} lg={12}>
                                                <DashboardItem>
                                                    <Selic />
                                                </DashboardItem>
                                            </Grid>

                                            {/* Gráfico de Inflação */}
                                            <Grid item xs={12}>
                                                <DashboardItem>
                                                    <Inflacao />
                                                </DashboardItem>
                                            </Grid>

                                            {/* Componentes carregados com lazy */}
                                            <Suspense fallback={<Box sx={{ height: '200px' }}><ContentSkeleton type="card" height={200} /></Box>}>
                                                {/* Câmbio de Moedas */}
                                                <Grid item xs={12}>
                                                    <DashboardItem>
                                                        <Moedas />
                                                    </DashboardItem>
                                                </Grid>

                                                {/* IFIX */}
                                                <Grid item xs={12}>
                                                    <DashboardItem>IFIX</DashboardItem>
                                                </Grid>

                                                {/* Commodities */}
                                                <Grid item xs={12}>
                                                    <DashboardItem>
                                                        <Commodities />
                                                    </DashboardItem>
                                                </Grid>

                                                {/* Debêntures */}
                                                <Grid item xs={12}>
                                                    <DashboardItem>
                                                        <Debentures />
                                                    </DashboardItem>
                                                </Grid>
                                            </Suspense>
                                        </Grid>
                                    </Grid>

                                    {/* Calendários na parte inferior - Largura total */}
                                    <Suspense fallback={<Box sx={{ height: '300px' }}><ContentSkeleton type="card" height={300} /></Box>}>
                                        <Grid item xs={12}>
                                            <DashboardItem>
                                                <Calendario />
                                            </DashboardItem>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <DashboardItem>Calendário de Proventos</DashboardItem>
                                        </Grid>
                                    </Suspense>
                                </Grid>
                            </Container>
                        </BackgroundContainer>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </PageTransition>
        </ErrorBoundary>
    );
};