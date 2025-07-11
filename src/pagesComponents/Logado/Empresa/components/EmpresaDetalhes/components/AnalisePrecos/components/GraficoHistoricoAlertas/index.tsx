import React, { useState, useEffect, useMemo } from 'react';
import { Typography, useTheme, CircularProgress, Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { GraficoContainer, GraficoHeader, ChartWrapper, LoadingContainer } from '../../../GraficoHistorico/styled';


interface PriceDataPoint {
    dataFormatada: string;
    valor: number;
    showLabel?: boolean;
}

interface ChartDataPoint {
    x: string;
    y: number;
    showLabel?: boolean;
    originalData: PriceDataPoint;
}

interface GraficoHistoricoAlertasProps {
    data: PriceDataPoint[];
    loading?: boolean;
    error?: string | null;
    alertaCompra?: number | null;
    alertaVenda?: number | null;
}

interface MarkerProps {
    axis: 'x' | 'y';
    value: number | string;
    lineStyle: { stroke: string; strokeWidth: number; strokeDasharray?: string };
    legend: string;
    legendPosition: 'top';
    legendOrientation?: 'horizontal';
    textStyle: { fill: string };
}

const GraficoHistoricoAlertas: React.FC<GraficoHistoricoAlertasProps> = ({
    data,
    loading = false,
    error = null,
    alertaCompra = null,
    alertaVenda = null,
}) => {
    const theme = useTheme();
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



    const markers: MarkerProps[] = useMemo(() => [
        alertaCompra !== null && {
            axis: 'y',
            value: alertaCompra,
            lineStyle: { stroke: theme.palette.success.main, strokeWidth: 2 },
            legend: `Alerta Compra R$ ${alertaCompra.toFixed(2)}`,
            legendPosition: 'top',
            legendOrientation: 'horizontal',
            textStyle: { fill: theme.palette.success.main }
        },
        alertaVenda !== null && {
            axis: 'y',
            value: alertaVenda,
            lineStyle: { stroke: theme.palette.error.main, strokeWidth: 2 },
            legend: `Alerta Venda R$ ${alertaVenda.toFixed(2)}`,
            legendPosition: 'top',
            legendOrientation: 'horizontal',
            textStyle: { fill: theme.palette.error.main }
        }

    ].filter(Boolean) as MarkerProps[], [alertaCompra, alertaVenda, theme.palette]);


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
            <GraficoHeader>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Typography variant="h4">Histórico de Preços com Alerta</Typography>
                </div>
            </GraficoHeader>

            <ChartWrapper>
                {loading ? (
                    <LoadingContainer>
                        <CircularProgress size={40} />
                        <Typography variant="body2" sx={{ mt: 2 }}>Carregando dados...</Typography>
                    </LoadingContainer>
                ) : error ? (
                    <LoadingContainer>
                        <Typography color="error">{error}</Typography>
                    </LoadingContainer>
                ) : chartData.length === 0 ? (
                    <LoadingContainer>
                        <Typography>Nenhum dado disponível para o período selecionado</Typography>
                    </LoadingContainer>
                ) : (
                    <Box sx={{ height: 400, position: 'relative' }}>
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
                                            style={{ fill: '#fff', fontSize: 12 }}
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
                                            style={{ fill: '#fff', fontSize: 12 }}
                                        >
                                            {`R$ ${Number(value).toFixed(2)}`}
                                        </text>
                                    </g>
                                )
                            }}
                            enableGridX={false}
                            enableGridY={true}

                            pointSize={8}
                            pointColor="white"
                            pointBorderWidth={2}

                            tooltip={({ point }) => (
                                <Box
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        padding: 1.5,
                                        borderRadius: 1,
                                        boxShadow: '0 0 10px rgba(0,0,0,0.25)',
                                        border: '1px solid rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                        Data: {String(point.data.x)}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Preço: R$ {Number(point.data.y).toFixed(2)}
                                    </Typography>
                                    {alertaCompra && (
                                        <Typography
                                            variant="body2"
                                            color={Number(point.data.y) <= alertaCompra ? 'success.main' : 'text.primary'}
                                        >
                                            Alerta de Compra: R$ {alertaCompra.toFixed(2)}
                                        </Typography>
                                    )}
                                    {alertaVenda && (
                                        <Typography
                                            variant="body2"
                                            color={Number(point.data.y) >= alertaVenda ? 'error.main' : 'text.primary'}
                                        >
                                            Alerta de Venda: R$ {alertaVenda.toFixed(2)}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                            lineWidth={1.5}
                            enableArea={false}
                            enablePoints={chartData.length < 60}
                            curve="monotoneX"
                            useMesh={true}
                            enableSlices="x"
                            markers={markers}
                        />
                    </Box>
                )}
            </ChartWrapper>
        </GraficoContainer>
    );
};

export default GraficoHistoricoAlertas;