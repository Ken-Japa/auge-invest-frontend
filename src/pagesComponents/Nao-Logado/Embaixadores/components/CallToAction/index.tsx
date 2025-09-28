import { Typography } from "@mui/material";
import { type FC } from 'react';

import { visitorColors } from "@/theme/palette/visitor";

import { CallToActionSkeleton } from "./CallToActionSkeleton";
import { CallToActionContainer, ContentStack, StyledButton } from "./styled";

interface CallToActionProps {
    isLoading?: boolean;
}

export const CallToAction: FC<CallToActionProps> = ({ isLoading }) => {
    if (isLoading) {
        return <CallToActionSkeleton />;
    }

    return (
        <CallToActionContainer>
            <ContentStack spacing={3} alignItems="center">
                <Typography variant="h3" className="cta-question">
                    Quer participar deste grupo seleto?
                </Typography>
                <Typography variant="h5" className="cta-message">
                    Assine nosso plano Premium e ajude-nos a continuar inovando!
                </Typography>
                <StyledButton
                    value="Fazer parte"
                    customColor={visitorColors.gold}
                    textColor="#000000"
                />
            </ContentStack>
        </CallToActionContainer>
    );
};

export default CallToAction;