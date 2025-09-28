"use client";
import { useRouter } from 'next/navigation';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { PageTransition } from '@/components/Utils/PageTransition';

import { BDRContent } from './components/BDRContent';
import { ErrorState } from './components/ErrorState';
import { LoadingState } from './components/LoadingState';
import { NotFoundState } from './components/NotFoundState';
import { useBDRDetails } from './hooks/useBDRDetails';
import { ContentWrapper,DetailPageContainer } from './styled';

interface BDRDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

const BDRDetails = ({ slug, codigo, isCode = false }: BDRDetailsProps) => {
  const router = useRouter();
  const { bdr, loading, error } = useBDRDetails({ slug, codigo, isCode });

  const handleBack = () => {
    router.back();
  };

  return (
    <PageTransition direction="up" duration={0.4} distance={30}>
      <ErrorBoundary>
        <SuspenseWrapper>
          <DetailPageContainer>
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onBack={handleBack} />
            ) : !bdr ? (
              <NotFoundState onBack={handleBack} />
            ) : (
              <ContentWrapper>
                <BDRContent bdr={bdr} />
              </ContentWrapper>
            )}
          </DetailPageContainer>
        </SuspenseWrapper>
      </ErrorBoundary>
    </PageTransition>
  );
};

export default BDRDetails;