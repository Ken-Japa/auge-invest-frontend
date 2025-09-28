import HandshakeIcon from '@mui/icons-material/Handshake';

import { visitorColors } from "@/theme/palette/visitor";

import { BaseSection, ContentContainer, SectionTitle, Subtitle } from "../../styled";
import { CompromissoSkeleton } from './CompromissoSkeleton';

interface CompromissoSectionProps {
    isLoading?: boolean;
}

export const CompromissoSection = ({ isLoading }: CompromissoSectionProps) => {
    if (isLoading) {
        return <CompromissoSkeleton />;
    }
    
    return (
        <BaseSection>
            <SectionTitle>
                <HandshakeIcon sx={{ color: visitorColors.accent, fontSize: 32 }} />
                <h2 className="text-2xl" style={{ color: visitorColors.accent }}>Nosso Compromisso</h2>
            </SectionTitle>
            <Subtitle>
                Não Vendemos Ferramentas. Entregamos Resultados.
            </Subtitle>
            <ContentContainer>
                <p>
                    Estamos comprometidos com o crescimento contínuo e a evolução de nossa plataforma. <br /><br />
                    Trabalhamos diariamente para trazer novas funcionalidades e melhorias, sempre ouvindo
                    o feedback de nossa comunidade.
                </p>
            </ContentContainer>
        </BaseSection>
    );
};