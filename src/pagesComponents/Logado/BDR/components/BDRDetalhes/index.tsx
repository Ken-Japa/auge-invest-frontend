"use client";
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { useBDRDetails } from './hooks/useBDRDetails';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { NotFoundState } from './components/NotFoundState';
import { BDRContent } from './components/BDRContent';
import { DetailPageContainer, ContentWrapper } from './styled';
import { UnifiedBDR } from '../../../components/BDR/types';

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