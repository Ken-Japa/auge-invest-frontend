"use client";
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

import ETFHeader from './ETFHeader';
import ETFInfoSection from './ETFInfoSection';
import ETFStatusDisplay from './ETFStatusDisplay';
import { useETFDetails } from './hooks/useETFDetails';
import { BackButton,ContentWrapper, DetailPageContainer } from './styled';

interface ETFDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

const ETFDetails = ({ slug, codigo, isCode = false }: ETFDetailsProps) => {
  const router = useRouter();
  const { etf, loading, error } = useETFDetails({ slug, codigo, isCode });


  const handleBack = () => {
    router.back();
  };

  if (loading || error || !etf) {
    return <ETFStatusDisplay loading={loading} error={error || (!etf ? 'ETF não encontrado.' : null)} onBack={handleBack} />;
  }

  return (
    <DetailPageContainer>
      <ContentWrapper>
        <ETFHeader
          nomeETF={etf.nomeETF}
          nomeCompletoETF={etf.nomeCompletoETF}
          quotaDateApproved={etf.quotaDateApproved || ""}
          codigo={etf.codigo}
        />

        <ETFInfoSection etf={etf} />

        <BackButton
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={handleBack}
          sx={{ mt: 4 }}
        >
          Voltar
        </BackButton>
      </ContentWrapper>
    </DetailPageContainer>
  );
};

export default ETFDetails;