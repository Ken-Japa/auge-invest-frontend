import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { BaseSection, SectionTitle } from "../../styled";
import { ValoresGrid, ValorCard } from "./styled";

export const ValoresSkeleton = () => (
    <BaseSection>
        <SectionTitle>
            <ContentSkeleton
                type="text"
                textLines={1}
                className="w-64 bg-[#ffffff0a] backdrop-blur-sm"
            />
        </SectionTitle>
        <ValoresGrid>
            {Array(3).fill(0).map((_, index) => (
                <ValorCard key={index}>
                    <ContentSkeleton
                        type="text"
                        textLines={3}
                        className="bg-[#ffffff0a] backdrop-blur-sm"
                        style={{ minHeight: '100px' }}
                    />
                </ValorCard>
            ))}
        </ValoresGrid>
    </BaseSection>
);