import { Box } from '@mui/material';

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad';
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton';
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper';
import { PageTransition } from '@/components/Utils/PageTransition';

import { CardsView } from './Elementos/ModoVisualizacao/Cards';
import { MapaArvore } from './Elementos/ModoVisualizacao/MapaArvore';
import { RedeNeural } from './Elementos/ModoVisualizacao/RedeNeural';
import { TabelaView } from './Elementos/ModoVisualizacao/TabelaView';
import { ViewMode } from './Elementos/ModoVisualizacao/types';
import { ContentPlaceholder,VisualizationWrapper } from './styled';

interface VisualizationContentProps {
    viewMode: ViewMode;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const VisualizationContent = ({ viewMode, isLoading, setIsLoading }: VisualizationContentProps) => {
    const LoadingOverlay = () => (
        <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
        }}>
            <ContentSkeleton type="card" cardHeight={300} />
        </Box>
    );

    const renderContent = () => {
        switch (viewMode) {
            case 'neural':
                return (
                    <VisualizationWrapper>
                        {isLoading && <LoadingOverlay />}
                        <ProgressiveLoad>
                            <RedeNeural onLoadingChange={setIsLoading} />
                        </ProgressiveLoad>
                    </VisualizationWrapper>
                );
            case 'tabela':
                return (
                    <VisualizationWrapper>
                        {isLoading && <LoadingOverlay />}
                        <ProgressiveLoad>
                            <TabelaView onLoadingChange={setIsLoading} />
                        </ProgressiveLoad>
                    </VisualizationWrapper>
                );
            case 'cartao':
                return (
                    <VisualizationWrapper>
                        <ContentPlaceholder>
                            <ProgressiveLoad>
                                <CardsView onLoadingChange={setIsLoading} />
                            </ProgressiveLoad>
                        </ContentPlaceholder>
                    </VisualizationWrapper>
                );
            case 'arvore':
                return (
                    <VisualizationWrapper>
                        {isLoading && <LoadingOverlay />}
                        <ProgressiveLoad>
                            <MapaArvore onLoadingChange={setIsLoading} />
                        </ProgressiveLoad>
                    </VisualizationWrapper>
                );
            default:
                return null;
        }
    };

    return (
        <PageTransition direction="up" duration={0.4}>
            <ErrorBoundary>
                <SuspenseWrapper fallback={<ContentSkeleton type="card" cardHeight={400} />}>
                    {renderContent()}
                </SuspenseWrapper>
            </ErrorBoundary>
        </PageTransition>
    );
};