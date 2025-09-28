import { CustomButton } from "@/components/Core/Button";
import { visitorColors } from "@/theme/palette/visitor";

import { PLANOS } from "../../constants/planos";
import { BaseSection, ContentWrapper } from "../../styled";
import { PlanosSkeleton } from "./PlanosSkeleton";
import { PlanoCard,PlanosGrid } from "./styled";

interface PlanosSectionProps {
    isLoading?: boolean;
}

export const PlanosSection = ({ isLoading }: PlanosSectionProps) => {
    if (isLoading) {
        return <PlanosSkeleton />;
    }
    return (
        <BaseSection>
            <ContentWrapper spacing={6}>
                <h2 className="text-3xl" style={{ color: visitorColors.accent }}>Escolha seu Plano</h2>
                <PlanosGrid>
                    {PLANOS.map((plano) => (
                        <PlanoCard key={plano.tipo}>
                            <h3 className="plano-tipo">{plano.tipo}</h3>
                            <p className="plano-preco">{plano.preco}</p>
                            <p className="plano-periodo">{plano.periodo}</p>
                            {plano.desconto && (
                                <p className="plano-desconto">{plano.desconto}</p>
                            )}
                            <CustomButton
                                value={plano.buttonText}
                                customColor={visitorColors.buttonPrimary}
                                textColor={visitorColors.text}
                                fullWidth
                            />
                        </PlanoCard>
                    ))}
                </PlanosGrid>
            </ContentWrapper>
        </BaseSection>
    );
};