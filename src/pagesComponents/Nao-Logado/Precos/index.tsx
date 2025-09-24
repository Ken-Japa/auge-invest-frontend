"use client";

import { useState, lazy } from "react";

import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { PageTransition } from "@/components/Utils/PageTransition";
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from "@/components/Feedback/ProgressiveLoad";
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";
import { visitorColors } from "@/theme/palette/visitor";

import { SectionPricing } from "./styled";

const VantagensSection = lazy(() => import('./components/VantagensSection').then(mod => ({ default: mod.VantagensSection })));
const RecursosSection = lazy(() => import('./components/RecursosSection').then(mod => ({ default: mod.RecursosSection })));
const PlanosSection = lazy(() => import('./components/PlanosSection').then(mod => ({ default: mod.PlanosSection })));
const EmbaixadorSection = lazy(() => import('./components/EmbaixadorSection').then(mod => ({ default: mod.EmbaixadorSection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(mod => ({ default: mod.FAQSection })));

export const Pricing = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <PageTransition direction="up" duration={0.4} distance={30} className="w-full">
            <ErrorBoundary>
                <SectionPricing>
                    <div className="background-image">
                        <OptimizedImage
                            src="/assets/images/background/Precos.jpg"
                            alt="Pricing Background"
                            fill
                            priority
                            fetchPriority="high"
                            sizes="100vw"
                            className="object-cover"
                            quality={90}
                            onLoad={() => setImageLoaded(true)}
                            style={{
                                filter: !imageLoaded ? 'grayscale(1)' : 'none',
                                transition: 'filter 0.5s ease-in-out'
                            }}
                        />
                    </div>
                    <div className="opacity">
                        <ProgressiveLoad>
                            <VantagensSection isLoading={!imageLoaded} />
                        </ProgressiveLoad>

                        <ProgressiveLoad>
                            <RecursosSection isLoading={!imageLoaded} />
                        </ProgressiveLoad>

                        <ProgressiveLoad>
                            <PlanosSection isLoading={!imageLoaded} />
                        </ProgressiveLoad>

                        <ProgressiveLoad>
                            <EmbaixadorSection isLoading={!imageLoaded} />
                        </ProgressiveLoad>

                        <ProgressiveLoad>
                            <TestimonialsSection isLoading={!imageLoaded} />
                        </ProgressiveLoad>

                        <ProgressiveLoad>
                            <SuspenseWrapper>
                                <FAQSection isLoading={!imageLoaded} />
                            </SuspenseWrapper>
                        </ProgressiveLoad>
                    </div>
                </SectionPricing>
            </ErrorBoundary>
        </PageTransition>
    );
};