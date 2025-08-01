import { Typography, Divider } from '@mui/material';
import { SummaryContainer, SummaryItem, SummaryLabel, SummaryValue } from './styled';

// Dados simulados - serão substituídos por dados da API
const mockSummaryData = {
    real: {
        totalValue: 12500,
        invested: 10000,
        result: 2500,
        performance: 25
    },
    mock: {
        totalValue: 5800,
        invested: 5000,
        result: 800,
        performance: 16
    }
};

interface PositionSummaryProps {
    type: 'real' | 'mock';
}

export const PositionSummary = ({ type }: PositionSummaryProps) => {
    const data = mockSummaryData[type];

    return (
        <SummaryContainer>
            <Typography variant="h4" gutterBottom>Resumo</Typography>

            <SummaryItem>
                <SummaryLabel>Patrimônio Total</SummaryLabel>
                <SummaryValue>
                    {data.totalValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </SummaryValue>
            </SummaryItem>

            <Divider />

            <SummaryItem>
                <SummaryLabel>Total Investido</SummaryLabel>
                <SummaryValue>
                    {data.invested.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel>Resultado</SummaryLabel>
                <SummaryValue sx={{ color: data.result >= 0 ? 'success.main' : 'error.main' }}>
                    {data.result.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel >Rentabilidade</SummaryLabel>
                <SummaryValue sx={{ color: data.performance >= 0 ? 'success.main' : 'error.main' }}>
                    {data.performance >= 0 ? '+' : ''}{data.performance}%
                </SummaryValue>
            </SummaryItem>
        </SummaryContainer>
    );
};