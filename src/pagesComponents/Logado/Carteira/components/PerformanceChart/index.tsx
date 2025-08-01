"use client";

import { Typography } from '@mui/material';
import { ChartContainer, ChartHeader, ChartPlaceholder } from './styled';

// Dados simulados - serão substituídos por dados da API
const mockChartData = {
    real: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        data: [10000, 11200, 10800, 12000, 12500],
        performance: 25
    },
    mock: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        data: [5000, 5300, 5100, 5600, 5800],
        performance: 16
    }
};

interface PerformanceChartProps {
    type: 'real' | 'mock';
}

export const PerformanceChart = ({ type }: PerformanceChartProps) => {
    const data = mockChartData[type];

    return (
        <>
            <ChartHeader>
                <Typography variant="h4">Evolução da Rentabilidade</Typography>
                <Typography
                    variant="h6"
                    color={data.performance >= 0 ? 'success.main' : 'error.main'}
                >
                    {data.performance >= 0 ? '+' : ''}{data.performance}%
                </Typography>
            </ChartHeader>
            <ChartContainer>
                {/* Placeholder do gráfico - será implementado com uma biblioteca de gráficos */}
                <ChartPlaceholder>
                    Gráfico será implementado
                </ChartPlaceholder>
            </ChartContainer>
        </>
    );
};