'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { useChartStyles, configureAlertMarkers } from '../../utils/chartConfig';
import { PriceDataPoint, ChartDataPoint, ChartMarker } from '../../utils/types';
import {
    GraficoContainer,
    GraficoTitle,
    LoadingContainer,
    ErrorContainer,
    EmptyDataContainer,
    TooltipContainer,
    TooltipTitle,
    TooltipRow,
    TooltipLabel,
    TooltipValue
} from './styled';


interface GraficoHistoricoAlertasProps {
    data: PriceDataPoint[];
    loading?: boolean;
    error?: string | null;
    alertaCompra?: number | null;
    alertaVenda?: number | null;
}

const GraficoHistoricoAlertas: React.FC<GraficoHistoricoAlertasProps> = ({
    data,
    loading = false,
    error = null,
    alertaCompra = null,
    alertaVenda = null,
}) => {
    const chartStyles = useChartStyles();
    const [chartData, setChartData] = useState<PriceDataPoint[]>([]);
    const [filteredData, setFilteredData] = useState<PriceDataPoint[]>(data);

    useEffect(() => {
        if (data.length === 0) return;
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (filteredData.length === 0) return;

        try {
            const totalPoints = filteredData.length;
            const maxLabels = 30;
            const interval = Math.max(1, Math.floor(totalPoints / maxLabels));

            const enhancedData = filteredData.map((item, index) => ({
                ...item,
                showLabel: index === 0 || index === totalPoints - 1 || index % interval === 0
            }));

            setChartData(enhancedData);
        } catch (error) {
            console.error('Erro ao processar dados históricos:', error);
        }
    }, [filteredData]);



    const markers: ChartMarker[] = useMemo(() => {
        return configureAlertMarkers(alertaCompra, alertaVenda, {
            success: chartStyles.colors.success,
            error: chartStyles.colors.error
        });
    }, [alertaCompra, alertaVenda, chartStyles.colors.success, chartStyles.colors.error]);


    const formattedChartData = useMemo(() => {
        return [{
            id: 'Valor',
            data: chartData.map(item => ({
                x: item.dataFormatada,
                y: item.valor,
                showLabel: item.showLabel,
                originalData: item
            } as ChartDataPoint))
        }];
    }, [chartData]);

    const customTickValues = useMemo(() => {
        return formattedChartData[0]?.data
            .filter(d => d.showLabel)
            .map(d => d.x) || [];
    }, [formattedChartData]);


    return (
        <GraficoContainer>
            <GraficoTitle variant="h6">
                Histórico de Preços com Alertas
            </GraficoTitle>

            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={40} />
                    <Typography variant="body2" sx={{ mt: 2, color: chartStyles.colors.text }}>Carregando dados...</Typography>
                </LoadingContainer>
            ) : error ? (
                <ErrorContainer>
                    <Typography variant="body1" sx={{ color: chartStyles.colors.error }}>{error}</Typography>
                </ErrorContainer>
            ) : chartData.length === 0 ? (
                <EmptyDataContainer>
                    <Typography variant="body1" sx={{ color: chartStyles.colors.text }}>Nenhum dado disponível para o período selecionado</Typography>
                </EmptyDataContainer>
            ) : (
                        <ResponsiveLine
                            data={formattedChartData}
                            margin={{ top: 20, right: 30, bottom: 100, left: 90 }}
                            xScale={{
                                type: 'point'
                            }}
                            yScale={{
                                type: 'linear',
                                min: 'auto',
                                max: 'auto',
                                stacked: false,
                                reverse: false
                            }}
                            axisBottom={{
                                tickRotation: -45,
                                tickPadding: 20,
                                format: value => value,
                                tickValues: customTickValues.length > 0 ? customTickValues : undefined,
                                renderTick: ({ x, y, value }) => (
                                    <g transform={`translate(${x},${y})`}>
                                        <text
                                            transform="rotate(-45)"
                                            textAnchor="end"
                                            dominantBaseline="middle"
                                            style={{ fill: chartStyles.colors.text, fontSize: 12 }}
                                        >
                                            {value}
                                        </text>
                                    </g>
                                )
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: value => `R$ ${Number(value).toFixed(2)}`,
                                renderTick: ({ x, y, value }) => (
                                    <g transform={`translate(${x},${y})`}>
                                        <text
                                            x={-10}
                                            textAnchor="end"
                                            dominantBaseline="middle"
                                            style={{ fill: chartStyles.colors.text, fontSize: 12 }}
                                        >
                                            {`R$ ${Number(value).toFixed(2)}`}
                                        </text>
                                    </g>
                                )
                            }}
                            enableGridX={false}
                            enableGridY={true}

                            pointSize={8}
                            pointColor={chartStyles.colors.background}
                            pointBorderWidth={2}

                            tooltip={({ point }) => (
                                <TooltipContainer>
                                    <TooltipTitle variant="body2">
                                        Data: {String(point.data.x)}
                                    </TooltipTitle>
                                    <TooltipRow>
                                        <TooltipLabel variant="body2">Preço:</TooltipLabel>
                                        <TooltipValue variant="body2">R$ {Number(point.data.y).toFixed(2)}</TooltipValue>
                                    </TooltipRow>
                                    {alertaCompra && (
                                        <TooltipRow>
                                            <TooltipLabel variant="body2">Alerta de Compra:</TooltipLabel>
                                            <TooltipValue 
                                                variant="body2"
                                                color={Number(point.data.y) <= alertaCompra ? chartStyles.colors.success : chartStyles.colors.text}
                                            >
                                                R$ {alertaCompra.toFixed(2)}
                                            </TooltipValue>
                                        </TooltipRow>
                                    )}
                                    {alertaVenda && (
                                        <TooltipRow>
                                            <TooltipLabel variant="body2">Alerta de Venda:</TooltipLabel>
                                            <TooltipValue 
                                                variant="body2"
                                                color={Number(point.data.y) >= alertaVenda ? chartStyles.colors.error : chartStyles.colors.text}
                                            >
                                                R$ {alertaVenda.toFixed(2)}
                                            </TooltipValue>
                                        </TooltipRow>
                                    )}
                                </TooltipContainer>
                            )}
                            lineWidth={1.5}
                            colors={[chartStyles.colors.primary]}
                            enableArea={false}
                            enablePoints={chartData.length < 60}
                            curve="monotoneX"
                            useMesh={true}
                            enableSlices="x"
                            markers={markers}
                        />
                )}
        </GraficoContainer>
    );
};

export default GraficoHistoricoAlertas;