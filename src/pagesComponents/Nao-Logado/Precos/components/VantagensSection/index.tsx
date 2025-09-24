import dynamic from "next/dynamic";
import { BaseSection, ContentWrapper } from "../../styled";
import { VantagensGrid, VantagemCard } from "./styled";
import { VantagensSkeleton } from "./VantagensSkeleton";

interface VantagensSectionProps {
    isLoading?: boolean;
}
const DynamicMatrixRainText = dynamic(() => import("@/components/Effects/MatrixRainText").then(mod => mod.MatrixRainText), {
    ssr: false,
    loading: () => <span className="title">Carregando...</span>,
});
export const VantagensSection = ({ isLoading }: VantagensSectionProps) => {
    if (isLoading) {
        return <VantagensSkeleton />;
    }
    return (
        <BaseSection>
            <ContentWrapper spacing={6}>
                <DynamicMatrixRainText
                    text="Por que escolher a Auge Invest?"
                    className="text-[#FF4081] text-4xl font-bold"
                />
                <VantagensGrid>
                    <VantagemCard>
                        <h3 className="title">Análise Avançada</h3>
                        <p className="description">Ferramentas profissionais para análise de mercado e tomada de decisão</p>
                    </VantagemCard>
                    <VantagemCard>
                        <h3 className="title">Dados em Tempo Real</h3>
                        <p className="description">Acompanhe suas posições e o mercado com atualizações constantes</p>
                    </VantagemCard>
                    <VantagemCard>
                        <h3 className="title">Suporte Dedicado</h3>
                        <p className="description">Equipe especializada para ajudar em suas dúvidas</p>
                    </VantagemCard>
                </VantagensGrid>
            </ContentWrapper>
        </BaseSection>
    );
};