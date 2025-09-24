"use client";

import { type FC, useState, lazy } from "react";
import { Container } from "@mui/material";

import { PageTransition } from "@/components/Utils/PageTransition";
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { OptimizedImage } from "@/components/Utils/OptimizedImage";
import { ProgressiveLoad } from "@/components/Feedback/ProgressiveLoad";
import { SuspenseWrapper } from "@/components/Feedback/SuspenseWrapper";

import { SectionPolicy } from "./styled";
import { useScroll } from "./hooks/useScroll";

const IMAGE_PROPS = {
  src: "/assets/images/background/BACKGROUND-DEFAULT.jpg",
  alt: "Imagem de Fundo da Política de Privacidade",
  fill: true,
  priority: true,
  fetchPriority: "high",
  sizes: "100vw",
  className: "object-cover",
  loadingClassName: "scale-100 blur-xl grayscale",
  quality: 85
} as const;

const Header = lazy(() => import('./components/Header').then(mod => ({ default: mod.Header })));
const QuickNavigation = lazy(() => import('./components/QuickNavigation').then(mod => ({ default: mod.QuickNavigation })));
const PrivacyContent = lazy(() => import('./components/PrivacyContent/PrivacyContent').then(mod => ({ default: mod.PrivacyContent })));
const ScrollToTop = lazy(() => import('./components/ScrollToTop').then(mod => ({ default: mod.ScrollToTop })));

export const PrivacyPolicy: FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { showScrollTop, scrollToTop, scrollToSection } = useScroll();

  return (
    <PageTransition direction="up" duration={0.4} distance={30} className="w-full">
      <ErrorBoundary>
        <SectionPolicy>
          <div className="background-image">
            <OptimizedImage
              {...IMAGE_PROPS}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="opacity">
            <div className="section-privacy">
              <Container maxWidth="lg">
                <SuspenseWrapper>
                  <Header isLoading={!imageLoaded} />
                </SuspenseWrapper>

                <SuspenseWrapper>
                  <QuickNavigation
                    onSectionClick={scrollToSection}
                    isLoading={!imageLoaded}
                  />
                </SuspenseWrapper>

                <ProgressiveLoad rootMargin="100px">
                  <SuspenseWrapper>
                    <PrivacyContent isLoading={!imageLoaded} />
                  </SuspenseWrapper>
                </ProgressiveLoad>

              </Container>
            </div>
          </div>
          <ScrollToTop show={showScrollTop} onClick={scrollToTop} />
        </SectionPolicy>
      </ErrorBoundary>
    </PageTransition>
  );
};