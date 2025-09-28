"use client";
import { CardContent,Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Suspense } from 'react';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { OptimizedImage } from '@/components/Utils/OptimizedImage';

import { tools } from './constants'
import { BackgroundImageStyle,Page, PageContainer, SectionTitle, StyledPageTransition, ToolCard, ToolIconContainer } from './styled';

const FerramentasPage = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const theme = useTheme();

    const imageProps = {
        src: theme.palette.mode === "dark" ? "/assets/images/background/Desenvolvimento-Dark.jpg" : "/assets/images/background/Desenvolvimento-Light.jpg",
        alt: "Imagem de Fundo de Desenvolvimento",
        fill: true,
        priority: true,
        fetchPriority: "high",
        className: "object-cover",
        sizes: "100vw",
        quality: 100,
        loadingClassName: "scale-100 blur-sm grayscale-0",
        onLoad: () => setImageLoaded(true)
    } as const;

    return (
        <ErrorBoundary>
            <StyledPageTransition direction="up" duration={0.4} distance={30}>
                <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
                    <ProgressiveLoad threshold={0.1} delay={0.2}>
                        <PageContainer>
                            <BackgroundImageStyle $isloaded={imageLoaded}>
                                <OptimizedImage {...imageProps} />
                            </BackgroundImageStyle>
                            <Page >
                                <SectionTitle variant="h2">
                                    Ferramentas em Desenvolvimento
                                </SectionTitle>
                                <Typography variant="h3" align="center" color="text.secondary" sx={{ mb: 4 }}>
                                    Estamos constantemente trabalhando para trazer as melhores ferramentas para você. Confira abaixo o que está por vir!
                                </Typography>
                                <Grid container spacing={4}>
                                    {tools.map((tool, index) => (
                                        <Grid item key={index} xs={12} sm={6} md={4}>
                                            <ToolCard>
                                                <ToolIconContainer>
                                                    <tool.icon sx={{ fontSize: '4rem' }} />
                                                </ToolIconContainer>
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography gutterBottom variant="h4" component="h2" color="text.primary" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
                                                        {tool.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary">
                                                        {tool.description}
                                                    </Typography>
                                                </CardContent>
                                            </ToolCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Page>
                        </PageContainer>
                    </ProgressiveLoad>
                </SuspenseWrapper>
            </StyledPageTransition>
        </ErrorBoundary>
    );
};

export const Desenvolvimento = () => {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <FerramentasPage />
        </Suspense>
    );
};