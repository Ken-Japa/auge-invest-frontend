import Link from 'next/link';
import { type FC } from 'react';

import { CustomButton } from "@/components/Core/Button";
import { visitorColors } from "@/theme/palette/visitor";

import { SupportContainer } from "./styled";

const BUTTON_PROPS = {
    value: "Contatar Suporte",
    customColor: visitorColors.buttonPrimary,
    textColor: visitorColors.text
} as const;

export const ContactSupport: FC = () => (
    <SupportContainer>
        <h3 className="support-title">Não encontrou o que procurava?</h3>
        <p className="support-text">
            Nossa equipe de suporte está pronta para ajudar você
        </p>
        <Link href="/visitante/contato">
            <CustomButton {...BUTTON_PROPS} />
        </Link>
    </SupportContainer>
);