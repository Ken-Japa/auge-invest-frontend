'use client'

import { Container } from '@mui/material'
import { type FC, lazy, useState } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { OptimizedImage } from '@/components/Helpers/OptimizedImage'
import { PageTransition } from '@/components/Helpers/PageTransition'

import { ScrollToTop } from './components/ScrollToTop'
import { useScroll } from './hooks/useScroll'
import { SectionTermsServices } from './styled'

const IMAGE_PROPS = {
  src: '/assets/images/background/BACKGROUND-DEFAULT.webp',
  alt: 'Imagem de Fundo dos Termos de Serviço',
  fill: true,
  priority: true,
  fetchPriority: 'high',
  sizes: '100vw',
  className: 'object-cover',
  loadingClassName: 'scale-100 blur-xl grayscale',
} as const

const Header = lazy(() => import('./components/Header').then((mod) => ({ default: mod.Header })))
const QuickNavigation = lazy(() =>
  import('./components/QuickNavigation').then((mod) => ({ default: mod.QuickNavigation })),
)
const TermsContent = lazy(() =>
  import('./components/TermsContent').then((mod) => ({ default: mod.TermsContent })),
)

export const TermsServices: FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { showScrollTop, scrollToTop, scrollToSection } = useScroll()

  return (
    <PageTransition direction="up" duration={0.4} distance={30} className="w-full">
      <ErrorBoundary>
        <SectionTermsServices>
          <div className="background-image">
            <OptimizedImage {...IMAGE_PROPS} onLoad={() => setImageLoaded(true)} />
          </div>
          <div className="opacity-layer">
            <Container maxWidth="lg" className="content-wrapper">
              <SuspenseWrapper>
                <Header isLoading={!imageLoaded} />
              </SuspenseWrapper>

              <SuspenseWrapper>
                <QuickNavigation onSectionClick={scrollToSection} isLoading={!imageLoaded} />
              </SuspenseWrapper>

              <ProgressiveLoad rootMargin="100px">
                <SuspenseWrapper>
                  <TermsContent isLoading={!imageLoaded} />
                </SuspenseWrapper>
              </ProgressiveLoad>
            </Container>
          </div>
          <ScrollToTop show={showScrollTop} onClick={scrollToTop} />
        </SectionTermsServices>
      </ErrorBoundary>
    </PageTransition>
  )
}
