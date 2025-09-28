import { visitorColors } from "@/theme/palette/visitor";

import { TESTIMONIALS } from "../../constants/testimonials";
import { BaseSection, ContentWrapper } from "../../styled";
import { TestimonialCard,TestimonialsGrid } from "./styled";
import { TestimonialsSkeleton } from "./TestimonialsSkeleton";

interface TestimonialsSectionProps {
    isLoading?: boolean;
}

export const TestimonialsSection = ({ isLoading }: TestimonialsSectionProps) => {
    if (isLoading) {
        return <TestimonialsSkeleton />;
    }
    return (
        <BaseSection>
            <ContentWrapper spacing={4}>
                <h2 className="text-3xl" style={{ color: visitorColors.text }}>O que dizem nossos usuários</h2>
                <TestimonialsGrid>
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={index}>
                            <p className="testimonial-text">&quot;{testimonial.comment}&quot;</p>
                            <div className="divider" />
                            <p className="testimonial-author">{testimonial.name}</p>
                            <p className="testimonial-role">{testimonial.role}</p>
                        </TestimonialCard>
                    ))}
                </TestimonialsGrid>
            </ContentWrapper>
        </BaseSection>
    );
};