import { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, useTheme, CircularProgress, Box, Paper, Grid, Slider, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { getHistoricalData, PriceDataPoint } from '../GraficoHistorico/services/historicalService';

// Importando Recharts para criar os gráficos
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
// Tipos para os períodos de análise
type AnalysisPeriod = 'all' | '5y' | '2.5y' | 'custom';

interface AnalisePrecoProps {
    codigoAtivo: string;
}

// Interface para os dados estatísticos calculados
interface StatisticalData {
    mean: number;
    stdDev: number;
    min: number;
    max: number;
    histogramData: Array<{ price: number; frequency: number; normalValue: number }>;
}

// Interface para os dados de cada período
interface PeriodData {
    label: string;
    period: AnalysisPeriod;
    data: PriceDataPoint[];
    stats: StatisticalData | null;
}

export const AnalisePrecos: React.FC<AnalisePrecoProps> = ({ codigoAtivo }) => {
    const [allHistoricalData, setAllHistoricalData] = useState<PriceDataPoint[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod>('5y');
    const [customYears, setCustomYears] = useState<number>(8.0);
    const theme = useTheme();

    // Buscar todos os dados históricos
    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (!codigoAtivo) return;

            setLoading(true);
            setError(null);

            try {
                // Buscar todos os dados históricos disponíveis
                const data = await getHistoricalData(codigoAtivo, 'MAX');

                if (!data || data.length === 0) {
                    setError(`Nenhum dado histórico encontrado para ${codigoAtivo}`);
                    return;
                }

                // Ordenar dados por data (mais antigo para mais recente)
                const sortedData = [...data].sort((a, b) =>
                    new Date(a.data).getTime() - new Date(b.data).getTime()
                );

                setAllHistoricalData(sortedData);
            } catch (error) {
                setError('Erro ao buscar dados históricos');
                console.error('Erro ao buscar dados históricos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [codigoAtivo]);

    // Função para calcular estatísticas para um conjunto de dados
    const calculateStatistics = useCallback((data: PriceDataPoint[]): StatisticalData | null => {
        if (!data || data.length === 0) return null;

        // Função para calcular média
        const calculateMean = (data: PriceDataPoint[]): number => {
            if (data.length === 0) return 0;
            const sum = data.reduce((acc, item) => acc + item.valor, 0);
            return sum / data.length;
        };

        // Função para calcular desvio padrão
        const calculateStdDev = (data: PriceDataPoint[], mean: number): number => {
            if (data.length <= 1) return 0;
            const squaredDiffs = data.map(item => Math.pow(item.valor - mean, 2));
            const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / (data.length - 1);
            return Math.sqrt(variance);
        };

        // Função para calcular o valor da distribuição normal
        const calculateNormalValue = (x: number, mean: number, stdDev: number): number => {
            if (stdDev === 0) return 0;
            const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
            return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
        };

        // Função para criar dados do histograma
        const createHistogramData = (data: PriceDataPoint[], mean: number, stdDev: number): StatisticalData['histogramData'] => {
            if (data.length === 0 || stdDev === 0) return [];

            // Encontrar min e max para definir os bins
            const values = data.map(item => item.valor);
            const min = Math.min(...values);
            const max = Math.max(...values);

            // Criar bins (intervalos de preço)
            const binCount = 20; // Número de bins para o histograma
            const binSize = (max - min) / binCount;
            const bins = Array.from({ length: binCount }, (_, i) => min + i * binSize);

            // Contar frequência em cada bin
            const frequencies = bins.map(binStart => {
                const binEnd = binStart + binSize;
                const count = values.filter(value => value >= binStart && value < binEnd).length;
                return {
                    price: binStart + binSize / 2, // Ponto médio do bin
                    frequency: count / data.length, // Frequência normalizada
                    normalValue: calculateNormalValue(binStart + binSize / 2, mean, stdDev) // Valor da curva normal
                };
            });

            return frequencies;
        };

        const mean = calculateMean(data);
        const stdDev = calculateStdDev(data, mean);
        const values = data.map(item => item.valor);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const histogramData = createHistogramData(data, mean, stdDev);

        return { mean, stdDev, min, max, histogramData };
    }, []);
    // Preparar dados para cada período
    const periodsData = useMemo(() => {
        if (allHistoricalData.length === 0) return [];

        const now = new Date();
        const fiveYearsAgo = new Date(now);
        fiveYearsAgo.setFullYear(now.getFullYear() - 5);

        const twoAndHalfYearsAgo = new Date(now);
        twoAndHalfYearsAgo.setFullYear(now.getFullYear() - 2);
        twoAndHalfYearsAgo.setMonth(now.getMonth() - 6);

        const customYearsAgo = new Date(now);
        customYearsAgo.setFullYear(now.getFullYear() - Math.floor(customYears));
        customYearsAgo.setMonth(now.getMonth() - Math.round((customYears % 1) * 12));

        // Filtrar dados para cada período
        const allData = [...allHistoricalData];
        const fiveYearData = allHistoricalData.filter(item =>
            new Date(item.data) >= fiveYearsAgo
        );
        const twoAndHalfYearData = allHistoricalData.filter(item =>
            new Date(item.data) >= twoAndHalfYearsAgo
        );
        const customYearData = allHistoricalData.filter(item =>
            new Date(item.data) >= customYearsAgo
        );

        // Calcular estatísticas para cada período
        return [
            { label: 'Todo o Histórico', period: 'all', data: allData, stats: calculateStatistics(allData) },
            { label: '5 Anos', period: '5y', data: fiveYearData, stats: calculateStatistics(fiveYearData) },
            { label: '2.5 Anos', period: '2.5y', data: twoAndHalfYearData, stats: calculateStatistics(twoAndHalfYearData) },
            { label: `Personalizável`, period: 'custom', data: customYearData, stats: calculateStatistics(customYearData) }
        ];
    }, [allHistoricalData, customYears, calculateStatistics]);

    // Obter dados do período selecionado
    const selectedPeriodData = useMemo(() => {
        return periodsData.find(p => p.period === selectedPeriod) || periodsData[0];
    }, [periodsData, selectedPeriod]);

    // Manipulador para mudança de período
    const handlePeriodChange = (event: SelectChangeEvent) => {
        setSelectedPeriod(event.target.value as AnalysisPeriod);
    };

    // Manipulador para mudança no slider de anos personalizados
    const handleCustomYearsChange = (_: Event, value: number | number[]) => {
        setCustomYears(value as number);
    };

    // Renderizar o gráfico de análise de preços
    const renderPriceAnalysisChart = () => {
        if (!selectedPeriodData || !selectedPeriodData.stats) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <Typography>Dados insuficientes para análise</Typography>
                </Box>
            );
        }

        const { mean, stdDev, histogramData } = selectedPeriodData.stats;

        // Adicionar linhas para os desvios padrão
        const stdDevLines = [
            { label: '-3σ', value: mean - 3 * stdDev },
            { label: '-2σ', value: mean - 2 * stdDev },
            { label: '-1σ', value: mean - 1 * stdDev },
            { label: 'Média', value: mean },
            { label: '+1σ', value: mean + 1 * stdDev },
            { label: '+2σ', value: mean + 2 * stdDev },
            { label: '+3σ', value: mean + 3 * stdDev },
        ];

        const heatmapAreas = [
            { label: '90%', start: mean - 1.645 * stdDev, end: mean + 1.645 * stdDev, opacity: 0.15 },
            { label: '70%', start: mean - 1.036 * stdDev, end: mean + 1.036 * stdDev, opacity: 0.25 },
            { label: '50%', start: mean - 0.674 * stdDev, end: mean + 0.674 * stdDev, opacity: 0.35 },
            { label: '30%', start: mean - 0.385 * stdDev, end: mean + 0.385 * stdDev, opacity: 0.45 },
        ];

        return (
            <Box sx={{ height: 400, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={histogramData}>
                        <CartesianGrid strokeDasharray="3 3" />


                        {heatmapAreas.map((area, index) => (
                            <ReferenceArea
                                key={`area-${index}`}
                                x1={area.start}
                                x2={area.end}
                                y1={0}
                                y2={1}
                                stroke="none"
                                fill={theme.palette.secondary.main}
                                fillOpacity={area.opacity}
                                yAxisId="left"
                                label={{
                                    value: area.label,
                                    position: 'insideTop',
                                    fill: theme.palette.text.secondary,
                                    fontSize: 10,
                                    opacity: 0.7
                                }}
                            />
                        ))}

                        <XAxis
                            dataKey="price"
                            label={{ value: 'Preço (R$)', position: 'insideBottom', offset: -5 }}
                            tickFormatter={(value) => value.toFixed(2)}
                        />
                        <YAxis
                            yAxisId="left"
                            label={{ value: 'Frequência', angle: -90, position: 'insideLeft' }}
                            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                            label={{ value: 'Distribuição Normal', angle: 90, position: 'insideRight' }}
                        />
                        <Tooltip
                            formatter={(value: any, name: string) => {
                                if (name === 'Frequência') {
                                    const percentage = (value as number * 100).toFixed(2);
                                    return [`${percentage}%`, name];
                                }
                                return [`${(value * 100).toFixed(2)}%`, name];
                            }}
                            labelFormatter={(label) => {
                                // Converter o label para número
                                const price = parseFloat(label as string);
                                // Acessar min e max diretamente do selectedPeriodData.stats
                                const { min, max } = selectedPeriodData.stats!;
                                const binSize = (max - min) / 20; // 20 é o número de bins definido em createHistogramData

                                // Calcular o início e fim do bin
                                const binStart = min + Math.floor((price - min) / binSize) * binSize;
                                const binEnd = binStart + binSize;

                                return `Intervalo de Preço: R$ ${binStart.toFixed(2)} - R$ ${binEnd.toFixed(2)}`;
                            }}
                            wrapperStyle={{ zIndex: 1000 }} // Garante que o tooltip fique visível
                            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #ccc', padding: '10px' }} // Melhora a visibilidade
                        />
                        <Legend />
                        <Bar
                            dataKey="frequency"
                            name="Frequência"
                            fill={theme.palette.primary.main}
                            yAxisId="left"
                            opacity={0.7}
                        />
                        <Line
                            type="monotone"
                            dataKey="normalValue"
                            name="Curva Normal"
                            stroke={theme.palette.secondary.main}
                            strokeWidth={2}
                            dot={false}
                            yAxisId="right"
                        />
                        {stdDevLines.map((line, index) => (
                            <ReferenceLine
                                key={index}
                                x={line.value}
                                stroke={line.label === 'Média' ? theme.palette.error.main : theme.palette.info.main}
                                strokeDasharray={line.label === 'Média' ? '3 0' : '3 3'}
                                label={{
                                    value: `${line.label} (${line.value.toFixed(2)})`,
                                    position: 'top',
                                    fill: line.label === 'Média' ? theme.palette.error.main : theme.palette.info.main,
                                    fontSize: 12
                                }}
                                yAxisId="left"
                            />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        );
    };

    // Renderizar estatísticas
    const renderStatistics = () => {
        if (!selectedPeriodData || !selectedPeriodData.stats) return null;

        const { mean, stdDev, min, max } = selectedPeriodData.stats;

        return (
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1">Preço Médio</Typography>
                        <Typography variant="h4">R$ {mean.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1">Desvio Padrão σ </Typography>
                        <Typography variant="h4">R$ {stdDev.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1">Preço Mínimo</Typography>
                        <Typography variant="h4">R$ {min.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1">Preço Máximo</Typography>
                        <Typography variant="h4">R$ {max.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    };

    // Renderizar sugestões de alertas
    const renderAlertSuggestions = () => {
        if (!selectedPeriodData || !selectedPeriodData.stats) return null;

        const { mean, stdDev } = selectedPeriodData.stats;

        const lowAlert = mean - 2 * stdDev;
        const highAlert = mean + 2 * stdDev;

        return (
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: theme.palette.success.light }}>
                        <Typography variant="subtitle1">Sugestão de Alerta de Compra</Typography>
                        <Typography variant="h4">R$ {lowAlert.toFixed(2)}</Typography>
                        <Typography variant="body2">
                            Preço abaixo de -2σ (95% dos preços históricos são maiores)
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: theme.palette.error.light }}>
                        <Typography variant="subtitle1">Sugestão de Alerta de Venda</Typography>
                        <Typography variant="h4">R$ {highAlert.toFixed(2)}</Typography>
                        <Typography variant="body2">
                            Preço acima de +2σ (95% dos preços históricos são menores)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h2" gutterBottom>Análise Estatística de Preços</Typography>
            <Typography variant="body1" paragraph>
                Esta ferramenta analisa a distribuição histórica de preços para ajudar a identificar níveis estatisticamente significativos para alertas de compra e venda.
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" sx={{ ml: 2 }}>Carregando dados...</Typography>
                </Box>
            ) : error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Período de Análise</InputLabel>
                                <Select
                                    value={selectedPeriod}
                                    label="Período de Análise"
                                    onChange={handlePeriodChange}
                                >
                                    {periodsData.map((period) => (
                                        <MenuItem key={period.period} value={period.period}>
                                            {period.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {selectedPeriod === 'custom' && (
                            <Grid item xs={12} md={6}>
                                <Typography gutterBottom>Período Escolhido - {customYears} Anos </Typography>
                                <Slider
                                    value={customYears}
                                    onChange={handleCustomYearsChange}
                                    min={0.5}
                                    max={10}
                                    step={0.5}
                                    marks={[
                                        { value: 0.5, label: '0.5' },
                                        { value: 5, label: '5' },
                                        { value: 10, label: '10' },
                                    ]}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `${value} anos`}
                                />
                            </Grid>
                        )}
                    </Grid>

                    {renderStatistics()}
                    {renderPriceAnalysisChart()}
                    {renderAlertSuggestions()}

                </>
            )}
        </Paper>
    );
};