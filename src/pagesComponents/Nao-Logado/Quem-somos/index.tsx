"use client";

import { type FC, useState, lazy } from 'react';
import { Stack } from "@mui/material";

import { PageTransition } from "@/components/Utils/PageTransition";
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { ProgressiveLoad } from "@/components/Feedback/ProgressiveLoad";
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";

import { SectionTeam } from "./styled";

// Lazy-loaded components
const Header = lazy(() => import('./components/Header').then(mod => ({ default: mod.Header })));
const HistoriaSection = lazy(() => import('./components/HistoriaSection').then(mod => ({ default: mod.HistoriaSection })));
const MissaoSection = lazy(() => import('./components/MissaoSection').then(mod => ({ default: mod.MissaoSection })));
const ValoresSection = lazy(() => import('./components/ValoresSection').then(mod => ({ default: mod.ValoresSection })));
const EquipeSection = lazy(() => import('./components/EquipeSection').then(mod => ({ default: mod.EquipeSection })));
const CompromissoSection = lazy(() => import('./components/CompromissoSection').then(mod => ({ default: mod.CompromissoSection })));

const AboutPage: FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <PageTransition direction="up" duration={0.4} distance={30} className="w-full">
            <ErrorBoundary>
                <SectionTeam>
                    <div className="background-image">
                        <OptimizedImage
                            src="/assets/images/background/Quem-Somos.jpg"
                            alt="Fundo da Página Quem Somos"
                            fill
                            priority
                            fetchPriority="high"
                            sizes="100vw"
                            className="object-cover"
                            loadingClassName="scale-100 blur-xl grayscale"
                            quality={85}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    <div className="opacity" />
                    <div className="content">
                        <div className="container mx-auto px-4 py-16 relative z-10">
                            <Stack spacing={8} alignItems="center">
                                <SuspenseWrapper>
                                    <Header isLoading={!imageLoaded} />
                                </SuspenseWrapper>

                                <SuspenseWrapper>
                                    <HistoriaSection isLoading={!imageLoaded} />
                                </SuspenseWrapper>

                                <ProgressiveLoad>
                                    <SuspenseWrapper>
                                        <MissaoSection isLoading={!imageLoaded} />
                                    </SuspenseWrapper>
                                </ProgressiveLoad>

                                <ProgressiveLoad>
                                    <SuspenseWrapper>
                                        <ValoresSection isLoading={!imageLoaded} />
                                    </SuspenseWrapper>
                                </ProgressiveLoad>

                                <ProgressiveLoad rootMargin="100px">
                                    <SuspenseWrapper>
                                        <EquipeSection isLoading={!imageLoaded} />
                                    </SuspenseWrapper>
                                </ProgressiveLoad>

                                <ProgressiveLoad rootMargin="100px">
                                    <SuspenseWrapper>
                                        <CompromissoSection isLoading={!imageLoaded} />
                                    </SuspenseWrapper>
                                </ProgressiveLoad>
                            </Stack>
                        </div>
                    </div>
                </SectionTeam>
            </ErrorBoundary>
        </PageTransition>
    );
};

export default AboutPage;