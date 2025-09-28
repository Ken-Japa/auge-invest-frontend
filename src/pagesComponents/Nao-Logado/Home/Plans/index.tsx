import { Stack } from "@mui/material";
import { type FC } from 'react';

import { Card } from "./Card";
import { PlansSkeleton } from "./PlansSkeleton";
import { SectionPlans } from "./styled";

interface PlansProps {
    isLoading?: boolean;
}
export const Plans: FC<PlansProps> = ({ isLoading }) => {
    if (isLoading) {
        return <PlansSkeleton />;
    }
    return (
        <SectionPlans>
            <div className="plans">
                <Stack direction="column" alignItems="center" width="100%" gap="30px">
                    <Stack
                        width="100%"
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={{ xs: 3, md: 2 }}
                    >
                        <Card
                            title="Trimestral"
                            price="R$80"
                            discount="12%"
                            valueBtn="Eu quero"
                            customColorBtn="#0056b3"
                        />
                        <Card
                            title="Mensal"
                            price="R$30"
                            list={[
                                'Todos os recursos disponíveis',
                                'Análise de preços',
                                'Dados exclusivos de histórico',
                                'Painel detalhado de economia',
                                'Acompanhamento da posição',
                                'Alerta de preços'
                            ]}
                            valueBtn="Assinar"
                            customColorBtn="#FFFFFF"
                            textColorBtn="#000000"
                        />
                        <Card
                            title="Anual"
                            price="R$280"
                            discount="23%"
                            valueBtn="Aproveitar desconto"
                            customColorBtn="#0056b3"
                        />
                    </Stack>
                    <Stack sx={{ width: { xs: '100%', md: 'auto' } }}>
                        <Card
                            title="Embaixador"
                            price="R$100"
                            list={[
                                'Acesso antecipado a betas',
                                'Seu nome no Hall da Fama',
                                'Limitado',
                                'Canal de comunicação direto com os desenvolvedores',
                                'Assinatura vitalícia (atingindo 5 mil usuários)'
                            ]}
                            valueBtn="Patrocinar"
                            customColorBtn="#FFD700"
                            textColorBtn="#000000"
                        />
                    </Stack>
                </Stack>
            </div>
        </SectionPlans>
    );
};