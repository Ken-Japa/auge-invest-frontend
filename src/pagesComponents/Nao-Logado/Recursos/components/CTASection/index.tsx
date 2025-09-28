import { Stack, Typography } from "@mui/material";
import Link from 'next/link';

import { CustomButton } from "@/components/Core/Button";
import { visitorColors } from "@/theme/palette/visitor";

import { CTASkeleton } from "./CTASkeleton";
import { CTAContainer } from "./styled";

interface CTASkeletonProps {
    isLoading?: boolean;
}

export const CTASection = ({ isLoading }: CTASkeletonProps) => {
    if (isLoading) {
        return <CTASkeleton />;
    }
    return (
        <CTAContainer>
            <Stack spacing={3} alignItems="center">
                <Typography variant="h3" className="cta-title">
                    Pronto para transformar seus investimentos?
                </Typography>
                <Typography className="cta-description">
                    Comece agora a usar ferramentas avançadas para tomar decisões mais precisas em seus investimentos.
                </Typography>
                <Link href="/register">
                    <CustomButton
                        value="Começar Gratuitamente"
                        customColor={visitorColors.buttonPrimary}
                        textColor={visitorColors.text}
                        size="large"
                        className="mt-4"
                        padding="24px 32px"
                    />
                </Link>
                <Link href="/visitante/precos" className="text-[#FF4081] hover:text-[#0D95F9]/95 underline">
                    <Typography>
                        Veja qual plano é o melhor para você
                    </Typography>
                </Link>
            </Stack>
        </CTAContainer>
    );
};