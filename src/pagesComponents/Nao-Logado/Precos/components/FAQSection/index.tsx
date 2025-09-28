import Link from "next/link";

import { visitorColors } from "@/theme/palette/visitor";

import { FAQ_ITEMS } from "../../constants/faq";
import { BaseSection, ContentWrapper } from "../../styled";
import { FAQSkeleton } from "./FAQSkeleton";
import { FAQContainer } from "./styled";

interface FAQSectionProps {
    isLoading?: boolean;
}

export const FAQSection = ({ isLoading }: FAQSectionProps) => {
    if (isLoading) {
        return <FAQSkeleton />;
    }
    return (
        <BaseSection>
            <ContentWrapper spacing={4}>
                <h2 className="text-3xl" style={{ color: visitorColors.text }}>Dúvidas Frequentes sobre Planos</h2>
                <FAQContainer>
                    {FAQ_ITEMS.map((item, index) => (
                        <div key={index} className="faq-item">
                            <h3 className="question">{item.question}</h3>
                            <p className="answer">{item.answer}</p>
                        </div>
                    ))}
                </FAQContainer>
                <Link href="/visitante/faq" className="text-[#0D95F9] hover:underline">
                    Ver todas as dúvidas →
                </Link>
            </ContentWrapper>
        </BaseSection>
    );
};