"use client";
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { useFIIDetails } from './hooks/useFIIDetails';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { NotFoundState } from './components/NotFoundState';
import { FIIContent } from './components/FIIContent';
import { DetailPageContainer, ContentWrapper } from './styled';

interface FIIDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

const FIIDetails = ({ slug, codigo, isCode = false }: FIIDetailsProps) => {
  const router = useRouter();
  const { fii, loading, error } = useFIIDetails({ slug, codigo, isCode });

  const handleBack = () => {
    router.back();
  };

  return (
    <PageTransition direction="up" duration={0.4} distance={30}>
      <ErrorBoundary>
        <SuspenseWrapper>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onBack={handleBack} />
          ) : !fii ? (
            <NotFoundState onBack={handleBack} />
          ) : (
            <DetailPageContainer>
              <ContentWrapper>
                <FIIContent fii={fii} />
              </ContentWrapper>
            </DetailPageContainer>
          )}
        </SuspenseWrapper>
      </ErrorBoundary>
    </PageTransition>
  );
};

export default FIIDetails;