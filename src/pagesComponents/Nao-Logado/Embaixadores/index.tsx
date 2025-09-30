"use client";

import { type FC, lazy, useEffect,useState } from "react";

import { ErrorBoundary } from "@/components/Feedback/ErrorBoundary";
import { OptimizedImage } from "@/components/Utils/OptimizedImage";

import { ambassadors } from './constants/ambassadors';
import { BackgroundImage,EmbaixadoresSection, StyledPageTransition } from './styled';

const Header = lazy(() => import('./components/Header').then(mod => ({ default: mod.Header })));
const CallToAction = lazy(() => import('./components/CallToAction').then(mod => ({ default: mod.CallToAction })));
const MainContent = lazy(() => import('./components/MainContent').then(mod => ({ default: mod.MainContent })));

const IMAGE_PROPS = {
    src: "/assets/images/background/Embaixadores.jpg",
    alt: "Fundo da página de Embaixadores",
    fill: true,
    priority: true,
    fetchPriority: "high",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw",
    className: "object-cover object-center",
    loading: "eager",
} as const;

export const Embaixadores: FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            const height = footer.offsetHeight;
            setFooterHeight(height);
        }
    }, []);

    return (
        <StyledPageTransition direction="up" duration={0.4} distance={30}>
            <ErrorBoundary>
                <EmbaixadoresSection footerHeight={footerHeight}>
                    <div className="background-container">
                        <BackgroundImage isLoaded={imageLoaded}>
                            <OptimizedImage
                                {...IMAGE_PROPS}
                                onLoad={() => setImageLoaded(true)}
                                style={{
                                    transition: 'opacity 0.3s ease-in-out'
                                }}
                            />
                        </BackgroundImage>
                        <div className="overlay" />
                    </div>
                    <MainContent
                        isLoading={!imageLoaded}
                        ambassadors={ambassadors}
                        Header={Header}
                        CallToAction={CallToAction}
                    />
                </EmbaixadoresSection>
            </ErrorBoundary>
        </StyledPageTransition>
    );
};

export default Embaixadores;