import HistoryIcon from '@mui/icons-material/Timeline';

import { visitorColors } from "@/theme/palette/visitor";

import { BaseSection, ContentContainer,SectionTitle } from "../../styled";
import { HistoriaSkeleton } from './HistoriaSkeleton';

interface HistoriaSectionProps {
    isLoading?: boolean;
}

export const HistoriaSection = ({ isLoading }: HistoriaSectionProps) => {
    if (isLoading) {
        return <HistoriaSkeleton />;
    }
    
    return (
        <BaseSection>
            <SectionTitle>
                <HistoryIcon sx={{ color: visitorColors.accent, fontSize: 32 }} />
                <h2 className="text-2xl" style={{ color: visitorColors.accent }}>Nossa História: A Revolução dos Dados</h2>
            </SectionTitle>
            <p className="text-white/80 mb-8">
                Forjando o Futuro do Investimento Inteligente
            </p>
            <ContentContainer>
                <p>
                    Começamos em 2023 não como mais uma fintech, mas como um movimento. <br /><br />
                    A Auge Capital nasceu da necessidade de democratizar o acesso a ferramentas avançadas de análise de investimentos normalmente disponíveis em grandes fundos.<br /><br />
                    Nossa equipe de especialistas em tecnologia e mercado financeiro se uniu com um objetivo comum: transformar dados complexos em insights amigáveis para investidores pessoas físicas a um preço justo.
                </p>
            </ContentContainer>
        </BaseSection>
    );
};