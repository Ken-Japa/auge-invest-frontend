"use client";

import { Typography } from '@mui/material';

// Componentes compartilhados
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { PageTransition } from '@/components/Utils/PageTransition';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';

// Componentes específicos
import { EmpresaContent } from './components/EmpresaContent';

// Hooks customizados
import {
  useEmpresaData,
  useHistoricalData,
  useDerivativesCheck,
  useTabNavigation,
  useUrlSync
} from './hooks';


// Estilos
import {
  EmpresaContainer,
  ContentContainer,
  StyledPaper,
  LoadingContainer,
  ErrorContainer
} from './styled';

interface EmpresaDetalhesProps {
  slug: string;
  codigoSelecionado?: string;
}

export const EmpresaDetalhes = ({ slug, codigoSelecionado }: EmpresaDetalhesProps) => {
  // Usar hooks customizados para gerenciar o estado e a lógica
  const { empresa, loading, error, codigoAtivo, setCodigoAtivo } = useEmpresaData(slug, codigoSelecionado);
  const { historicalData, metricas } = useHistoricalData(empresa, codigoAtivo);
  const hasDerivatives = useDerivativesCheck(codigoAtivo);
  const { currentTab, handleTabChange } = useTabNavigation(hasDerivatives);
  const { handleCodigoChange } = useUrlSync({ empresa, codigoAtivo, setCodigoAtivo });

  // Renderização condicional para estados de carregamento e erro
  if (loading) {
    return (
      <LoadingContainer>
        <ContentSkeleton type="card" cardHeight={400} />
      </LoadingContainer>
    );
  }

  if (error || !empresa) {
    return (
      <ErrorContainer>
        <StyledPaper>
          <Typography color="error">{error || 'Empresa não encontrada'}</Typography>
        </StyledPaper>
      </ErrorContainer>
    );
  }

  // Renderização do componente principal quando os dados estão disponíveis
  return (
    <ErrorBoundary>
      <PageTransition>
        <EmpresaContainer>
          <ContentContainer>
            <ProgressiveLoad>
              <EmpresaContent
                empresa={empresa}
                codigoAtivo={codigoAtivo || ''}
                historicalData={historicalData}
                metricas={metricas}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
                handleCodigoChange={handleCodigoChange}
                hasDerivatives={hasDerivatives}
              />
            </ProgressiveLoad>
          </ContentContainer>
        </EmpresaContainer>
      </PageTransition>
    </ErrorBoundary>
  );
};