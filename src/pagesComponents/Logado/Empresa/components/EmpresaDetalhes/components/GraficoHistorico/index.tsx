import { useState, useEffect, useMemo } from 'react';
import { Typography, useTheme, CircularProgress } from '@mui/material';

import { LineChart } from '@/components/Data-Display/Charts/LineChart';
import { PeriodSelector, PeriodType } from './components/PeriodSelector';
import { filterDataByPeriod, getOptimalDataInterval, getOptimizedLabels } from './utils/dataFilters';
import { GraficoContainer, GraficoHeader, ChartWrapper, LoadingContainer } from './styled';
import { getHistoricalData } from './services/historicalService';

interface GraficoHistoricoProps {
    codigoAtivo: string;
}

export const GraficoHistorico: React.FC<GraficoHistoricoProps> = ({ codigoAtivo }) => {
    // Alterando o período padrão para 5A
    const [period, setPeriod] = useState<PeriodType>('5A');
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [allHistoricalData, setAllHistoricalData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();

    const textColor = theme.palette.text.primary;
    const gridColor = theme.palette.divider;

    // Buscar dados históricos quando o código do ativo ou período mudar
    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (!codigoAtivo) return;

            setLoading(true);
            setError(null);

            try {
                // Buscar dados históricos com base no período selecionado
                const data = await getHistoricalData(codigoAtivo, period);

                if (!data || data.length === 0) {
                    setError(`Nenhum dado histórico encontrado para ${codigoAtivo}`);
                    setAllHistoricalData([]);
                    return;
                }

                setAllHistoricalData(data);
            } catch (error) {
                setError('Erro ao buscar dados históricos');
                console.error('Erro ao buscar dados históricos completos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [codigoAtivo, period]);

    // Processar e otimizar dados para exibição
    // No useEffect onde você processa os dados
    useEffect(() => {
        if (allHistoricalData.length === 0) return;

        try {
            // Filtrar dados com base no período selecionado
            const filteredData = filterDataByPeriod(allHistoricalData, period);

            // Determinar quais pontos devem mostrar labels (para evitar sobreposição)
            const totalPoints = filteredData.length;
            const maxLabels = period === 'MAX' ? 20 : period === '5A' ? 15 : period === '1A' ? 12 : period === '6M' ? 10 : 6;
            const interval = Math.max(1, Math.floor(totalPoints / maxLabels));

            // Marcar pontos que mostrarão labels
            const enhancedData = filteredData.map((item, index) => ({
                ...item,
                // Mostrar label apenas para pontos em intervalos regulares, primeiro e último
                showLabel: index === 0 || index === totalPoints - 1 || index % interval === 0
            }));

            setChartData(enhancedData);
        } catch (error) {
            setError('Erro ao processar dados históricos');
            console.error('Erro ao processar dados históricos:', error);
        }
    }, [allHistoricalData, period]);

    const handlePeriodChange = (newPeriod: PeriodType) => {
        setPeriod(newPeriod);
    };

    // Calcular estatísticas para exibição
    const stats = useMemo(() => {
        if (chartData.length === 0) return null;

        const firstPrice = chartData[0]?.valor || 0;
        const lastPrice = chartData[chartData.length - 1]?.valor || 0;
        const change = lastPrice - firstPrice;
        const percentChange = (change / firstPrice) * 100;

        return {
            change,
            percentChange,
            isPositive: change >= 0
        };
    }, [chartData]);

    return (
        <GraficoContainer>
            <GraficoHeader>
                <div>
                    <Typography variant="h4">Histórico de Preços {codigoAtivo} </Typography>
                    {stats && (
                        <Typography
                            variant="body2"
                            color={stats.isPositive ? 'success.main' : 'error.main'}
                        >
                            {stats.isPositive ? '+' : ''}{stats.change.toFixed(2)} ({stats.isPositive ? '+' : ''}{stats.percentChange.toFixed(2)}%)
                        </Typography>
                    )}
                </div>
                <PeriodSelector value={period} onChange={handlePeriodChange} />
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
                    <LineChart
                        data={chartData}
                        loading={false}
                        xKey="dataFormatada"
                        yKey="valor"
                        labelFormat={(value) => `R$ ${value.toFixed(2)}`}
                        xAxisProps={{
                            angle: 45,
                            textAnchor: 'start',
                            height: 60,
                            fontSize: 12,
                            tickSize: 10,
                            tickPadding: 8,
                            legendOffset: 50,
                            legendPosition: 'middle',
                            tickRotation: 45,
                            tickColor: gridColor,
                            legendColor: textColor,
                            tickTextColor: textColor,
                            // Reduzir a quantidade de ticks no eixo X para melhorar a visualização
                            tickInterval: Math.max(1, Math.floor(chartData.length / 10))
                        }}
                        yAxisProps={{
                            width: 70,
                            fontSize: 12,
                            tickFormatter: (value: number) => `R$ ${value.toFixed(2)}`,
                            tickSize: 10,
                            tickPadding: 8,
                            legendOffset: -50,
                            legendPosition: 'middle',
                            tickValues: 5,
                            tickColor: gridColor,
                            legendColor: textColor,
                            tickTextColor: textColor
                        }}
                        tooltipProps={{
                            formatter: (value: number) => [`R$ ${value.toFixed(2)}`],
                            labelFormatter: (label: string) => {
                                const item = chartData.find(d => d.dataFormatada === label);
                                if (item) {
                                    return new Date(item.data).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    });
                                }
                                return label;
                            }
                        }}
                        chartProps={{
                            enableGridX: true,
                            enableGridY: true,
                            gridXColor: gridColor,
                            gridYColor: gridColor,
                            lineWidth: 2.5,
                            enableArea: true,
                            areaOpacity: 0.1,
                            enablePoints: chartData.length < 60,
                            pointSize: 4,
                            pointBorderWidth: 1.5,
                            pointColor: theme.palette.background.paper,
                            curve: 'monotoneX',
                            colors: [theme.palette.primary.main],
                            margin: { top: 20, right: 30, bottom: 80, left: 90 }
                        }}
                    />
                )}
            </ChartWrapper>
        </GraficoContainer>
    );
};