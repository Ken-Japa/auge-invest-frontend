import dynamic from "next/dynamic";

import { CustomButton } from "@/components/Core/Button";
import { visitorColors } from "@/theme/palette/visitor";

import { EMBAIXADOR_BENEFICIOS } from "../../constants/embaixador";
import { BaseSection, ContentWrapper } from "../../styled";
import { EmbaixadorSkeleton } from "./EmbaixadorSkeleton";
import { Description,EmbaixadorCard } from "./styled";

interface EmbaixadorSectionProps {
    isLoading?: boolean;
}
const DynamicMatrixRainText = dynamic(() => import("@/components/Effects/MatrixRainText").then(mod => mod.MatrixRainText), {
    ssr: false,
    loading: () => <span className="title">Carregando...</span>,
});
export const EmbaixadorSection = ({ isLoading }: EmbaixadorSectionProps) => {
    if (isLoading) {
        return <EmbaixadorSkeleton />;
    }
    return (
        <BaseSection>
            <ContentWrapper spacing={4}>
                <DynamicMatrixRainText
                    text="Seja um Embaixador"
                    className="text-[#FF4081] text-4xl font-bold"
                />
                <Description>
                    Torne-se um embaixador da Auge Invest e faça parte do nosso crescimento.<br /><br />
                    Como embaixador, você terá acesso vitalício à plataforma após atingirmos 5.000 usuários,
                    além de benefícios exclusivos.
                </Description>
                <EmbaixadorCard>
                    <h3 className="card-title">Plano Embaixador</h3>
                    <p className="card-price">R$100</p>
                    <p className="card-period">/mês</p>
                    <ul className="benefits-list">
                        {EMBAIXADOR_BENEFICIOS.map((beneficio, index) => (
                            <li key={index} className="benefit-item">
                                <span className="icon">›</span>
                                {beneficio}
                            </li>
                        ))}
                    </ul>
                    <CustomButton
                        value="Tornar-se Embaixador"
                        customColor={visitorColors.buttonSecondary}
                        textColor={visitorColors.text}
                        fullWidth
                    />
                </EmbaixadorCard>
            </ContentWrapper>
        </BaseSection>
    );
};