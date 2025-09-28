import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { CustomAccordion } from "@/components/Core/Accordion";
import { CustomButton } from "@/components/Core/Button";

import {
    ButtonContainer,
    LabelRow,
    StyledProfileLabel,
    StyledProfileValue,
    SubscriptionContainer,
    SubscriptionField} from "./styled";

export const SubscriptionInfo = () => {
    const theme = useTheme();

    return (
        <SubscriptionContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <CustomAccordion
                title="Informações de Assinatura"
                variant={theme.palette.mode === 'dark' ? 'light' : 'light'}
                customBackground="rgba(255, 255, 255, 0.9)"
                customTitleColor={theme.palette.common.black}
                customContentBackground="rgba(255, 255, 255, 0.9)"
            >
                <SubscriptionField>
                    <LabelRow>
                        <StyledProfileLabel darkMode={theme.palette.mode === 'dark'}>Plano Atual</StyledProfileLabel>
                        <Chip
                            label="Ativo"
                            size="small"
                            color="success"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                    </LabelRow>
                    <StyledProfileValue darkMode={theme.palette.mode === 'dark'}>Plano Premium</StyledProfileValue>
                </SubscriptionField>

                <SubscriptionField>
                    <StyledProfileLabel darkMode={theme.palette.mode === 'dark'}>Data de Início</StyledProfileLabel>
                    <StyledProfileValue darkMode={theme.palette.mode === 'dark'}>15 de Janeiro de 2024</StyledProfileValue>
                </SubscriptionField>

                <SubscriptionField>
                    <StyledProfileLabel darkMode={theme.palette.mode === 'dark'}>Próxima Cobrança</StyledProfileLabel>
                    <StyledProfileValue darkMode={theme.palette.mode === 'dark'}>15 de Fevereiro de 2024</StyledProfileValue>
                </SubscriptionField>

                <SubscriptionField>
                    <StyledProfileLabel darkMode={theme.palette.mode === 'dark'}>Método de Pagamento</StyledProfileLabel>
                    <StyledProfileValue darkMode={theme.palette.mode === 'dark'}>Cartão de Crédito (•••• 4242)</StyledProfileValue>
                </SubscriptionField>

                <ButtonContainer>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Gerenciar Assinatura
                    </CustomButton>
                </ButtonContainer>
            </CustomAccordion>
        </SubscriptionContainer>
    );
};