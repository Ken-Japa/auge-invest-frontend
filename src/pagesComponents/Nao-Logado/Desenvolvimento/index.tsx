"use client";
import React from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { Typography, Grid, CardContent } from '@mui/material';
import { tools } from './constants'
import { PageContainer, Page, SectionTitle, ToolCard, ToolIconContainer, StyledPageTransition } from './styled';

const FerramentasPage = () => {
    return (
        <StyledPageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <PageContainer>
                    <Page >
                        <SectionTitle variant="h2">
                            Ferramentas em Desenvolvimento
                        </SectionTitle>
                        <Typography variant="h4" align="center" color="text.secondary" sx={{ mb: 4 }}>
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
            </ErrorBoundary>
        </StyledPageTransition>
    );
};

export const Desenvolvimento = () => {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <FerramentasPage />
        </Suspense>
    );
};