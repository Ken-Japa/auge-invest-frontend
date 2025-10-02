'use client'

import { Container, Stack } from '@mui/material'
import Link from 'next/link'
import { type FC, lazy, useState } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { OptimizedImage } from '@/components/Helpers/OptimizedImage'
import { PageTransition } from '@/components/Helpers/PageTransition'

import {
  BackgroundImageWrapper,
  BackgroundOverlay,
  FaqLink,
  MainContainer,
  Section,
  SectionSubtitle,
  SectionTitle,
  StyledDivider,
  StyledTypography,
} from './styled'
import { Welcome } from './Welcome'

const Plans = lazy(() => import('./Plans').then((mod) => ({ default: mod.Plans })))
const Questions = lazy(() => import('./Questions').then((mod) => ({ default: mod.Questions })))
const Newsletter = lazy(() => import('./Newsletter').then((mod) => ({ default: mod.Newsletter })))
const Features = lazy(() => import('./Features').then((mod) => ({ default: mod.Features })))

export const Home: FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <PageTransition direction="up" duration={0.4} distance={30} className="w-full">
      <ErrorBoundary>
        <MainContainer>
          <Section className="relative min-h-screen">
            <BackgroundImageWrapper>
              <OptimizedImage
                src="/assets/images/background/HOME.webp"
                alt="Home Background"
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover"
                loadingClassName="scale-100 blur-xl grayscale opacity-50"
                onLoad={() => setImageLoaded(true)}
              />
              <BackgroundOverlay />
            </BackgroundImageWrapper>
            <Welcome isLoading={!imageLoaded} />
          </Section>

          <ProgressiveLoad>
            <Section withPadding>
              <SuspenseWrapper>
                <Features isLoading={!imageLoaded} />
              </SuspenseWrapper>
            </Section>
          </ProgressiveLoad>

          <ProgressiveLoad>
            <SuspenseWrapper>
              <Newsletter isLoading={!imageLoaded} />
            </SuspenseWrapper>
          </ProgressiveLoad>

          <ProgressiveLoad>
            <StyledDivider />
            <Section withPadding withBackground>
              <Container maxWidth="xl">
                <Stack spacing={6} alignItems="center">
                  <Stack spacing={4} alignItems="center">
                    <SectionTitle>Escolha o Plano Ideal</SectionTitle>
                    <SectionSubtitle>
                      Invista no seu futuro – Não pague por ferramentas ultrapassadas.
                      <br /> <br />
                      Escolha a opção que melhor atende às suas necessidades.
                    </SectionSubtitle>
                  </Stack>
                  <SuspenseWrapper>
                    <Plans isLoading={!imageLoaded} />
                  </SuspenseWrapper>
                </Stack>
              </Container>
            </Section>
          </ProgressiveLoad>

          <ProgressiveLoad>
            <StyledDivider />
            <Section withPadding>
              <Container maxWidth="xl">
                <SuspenseWrapper>
                  <Questions isLoading={!imageLoaded} />
                </SuspenseWrapper>
                <Stack alignItems="center" sx={{ mt: 4 }}>
                  <StyledTypography variant="body1">
                    Encontre mais respostas acessando o{' '}
                    <Link href="/visitante/faq" passHref legacyBehavior={false}>
                      <FaqLink>FAQ</FaqLink>
                    </Link>
                    .
                  </StyledTypography>
                </Stack>
              </Container>
            </Section>
          </ProgressiveLoad>
        </MainContainer>
      </ErrorBoundary>
    </PageTransition>
  )
}
