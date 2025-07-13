import { getHistoricalData } from "../../GraficoHistorico/services/historicalService";
import {
  PriceDataPoint,
  StatisticalData,
  PeriodData,
  AnalysisPeriod,
  DetailedAlert,
  AlertSuggestions,
  StdDevLine
} from "../utils/types";

/**
 * Busca os dados históricos para um ativo específico
 */
export const fetchHistoricalData = async (
  codigoAtivo: string
): Promise<PriceDataPoint[]> => {
  try {
    // Buscar todos os dados históricos disponíveis
    const data = await getHistoricalData(codigoAtivo, "MAX");

    if (!data || data.length === 0) {
      throw new Error(`Nenhum dado histórico encontrado para ${codigoAtivo}`);
    }

    // Ordenar dados por data (mais antigo para mais recente)
    return [...data].sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );
  } catch (error) {
    console.error("Erro ao buscar dados históricos:", error);
    throw error;
  }
};

/**
 * Calcula estatísticas para um conjunto de dados
 */
export const calculateStatistics = (
  data: PriceDataPoint[]
): StatisticalData | null => {
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
    const squaredDiffs = data.map((item) => Math.pow(item.valor - mean, 2));
    const variance =
      squaredDiffs.reduce((acc, val) => acc + val, 0) / (data.length - 1);
    return Math.sqrt(variance);
  };

  // Função para calcular o valor da distribuição normal
  const calculateNormalValue = (
    x: number,
    mean: number,
    stdDev: number
  ): number => {
    if (stdDev === 0) return 0;
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  };

  // Função para criar dados do histograma
  const createHistogramData = (
    data: PriceDataPoint[],
    mean: number,
    stdDev: number
  ): StatisticalData["histogramData"] => {
    if (data.length === 0 || stdDev === 0) return [];

    // Encontrar min e max para definir os bins
    const values = data.map((item) => item.valor);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Criar bins (intervalos de preço)
    const binCount = 20; // Número de bins para o histograma
    const binSize = (max - min) / binCount;
    const bins = Array.from({ length: binCount }, (_, i) => min + i * binSize);

    // Contar frequência em cada bin
    const frequencies = bins.map((binStart) => {
      const binEnd = binStart + binSize;
      const count = values.filter(
        (value) => value >= binStart && value < binEnd
      ).length;
      return {
        price: binStart + binSize / 2, // Ponto médio do bin
        frequency: count / data.length, // Frequência normalizada
        normalValue: calculateNormalValue(binStart + binSize / 2, mean, stdDev), // Valor da curva normal
      };
    });

    return frequencies;
  };

  const mean = calculateMean(data);
  const stdDev = calculateStdDev(data, mean);
  const values = data.map((item) => item.valor);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const histogramData = createHistogramData(data, mean, stdDev);

  return { mean, stdDev, min, max, histogramData };
};

/**
 * Prepara os dados para cada período de análise
 */
export const preparePeriodData = (
  allHistoricalData: PriceDataPoint[],
  customYears: number
): PeriodData[] => {
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
  const fiveYearData = allHistoricalData.filter(
    (item) => new Date(item.data) >= fiveYearsAgo
  );
  const twoAndHalfYearData = allHistoricalData.filter(
    (item) => new Date(item.data) >= twoAndHalfYearsAgo
  );
  const customYearData = allHistoricalData.filter(
    (item) => new Date(item.data) >= customYearsAgo
  );

  // Calcular estatísticas para cada período
  return [
    {
      label: "Todo o Histórico",
      period: "all",
      data: allData,
      stats: calculateStatistics(allData),
    },
    {
      label: "5 Anos",
      period: "5y",
      data: fiveYearData,
      stats: calculateStatistics(fiveYearData),
    },
    {
      label: "2.5 Anos",
      period: "2.5y",
      data: twoAndHalfYearData,
      stats: calculateStatistics(twoAndHalfYearData),
    },
    {
      label: `Personalizável`,
      period: "custom",
      data: customYearData,
      stats: calculateStatistics(customYearData),
    },
  ];
};

/**
 * Gera linhas de desvio padrão para o gráfico
 */
export const generateStdDevLines = (mean: number, stdDev: number): StdDevLine[] => {
  return [
    { label: "-3σ", value: mean - 3 * stdDev },
    { label: "-2σ", value: mean - 2 * stdDev },
    { label: "-1σ", value: mean - 1 * stdDev },
    { label: "Média", value: mean },
    { label: "+1σ", value: mean + 1 * stdDev },
    { label: "+2σ", value: mean + 2 * stdDev },
    { label: "+3σ", value: mean + 3 * stdDev },
  ];
};

/**
 * Calcula a porcentagem de preços acima ou abaixo de um determinado valor
 */
export const calculatePricePercentage = (
  data: PriceDataPoint[],
  targetPrice: number,
  isAbove: boolean
): number => {
  if (!data || data.length === 0) return 0;

  const totalPrices = data.length;
  const count = data.filter((item) =>
    isAbove ? item.valor > targetPrice : item.valor < targetPrice
  ).length;

  return (count / totalPrices) * 100;
};

/**
 * Encontra a última data em que um preço específico foi atingido ou ultrapassado
 */
export const findLastDateForPrice = (
  data: PriceDataPoint[],
  targetPrice: number,
  isAbove: boolean
): { date: Date | null; daysSince: number | null } => {
  if (!data || data.length === 0) return { date: null, daysSince: null };

  // Ordenar dados por data (mais recente para mais antigo)
  const sortedData = [...data].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  // Encontrar o último ponto de dados que atende ao critério
  const lastMatch = sortedData.find((item) =>
    isAbove ? item.valor >= targetPrice : item.valor <= targetPrice
  );

  if (!lastMatch) return { date: null, daysSince: null };

  const lastDate = new Date(lastMatch.data);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const daysSince = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return { date: lastDate, daysSince };
};

/**
 * Calcula sugestões de alertas com base nas estatísticas
 */
export const calculateAlertSuggestions = (
  mean: number,
  stdDev: number,
  data: PriceDataPoint[]
): AlertSuggestions => {
  // Ordenar os preços do menor para o maior
  const sortedPrices = data.map((item) => item.valor).sort((a, b) => a - b);

  // Calcular os índices para os percentis desejados
  const lowAlert90Idx = Math.floor(sortedPrices.length * 0.1); // 90% acima
  const lowAlert80Idx = Math.floor(sortedPrices.length * 0.2); // 80% acima
  const lowAlert70Idx = Math.floor(sortedPrices.length * 0.3); // 70% acima
  const highAlert90Idx = Math.floor(sortedPrices.length * 0.9); // 90% abaixo
  const highAlert80Idx = Math.floor(sortedPrices.length * 0.8); // 80% abaixo
  const highAlert70Idx = Math.floor(sortedPrices.length * 0.7); // 70% abaixo

  // Obter os preços nos índices calculados
  const lowAlert90 = sortedPrices[lowAlert90Idx];
  const lowAlert80 = sortedPrices[lowAlert80Idx];
  const lowAlert70 = sortedPrices[lowAlert70Idx];
  const highAlert90 = sortedPrices[highAlert90Idx];
  const highAlert80 = sortedPrices[highAlert80Idx];
  const highAlert70 = sortedPrices[highAlert70Idx];

  // Calcular porcentagens exatas
  const lowPercentage90 = calculatePricePercentage(data, lowAlert90, true);
  const lowPercentage80 = calculatePricePercentage(data, lowAlert80, true);
  const lowPercentage70 = calculatePricePercentage(data, lowAlert70, true);
  const highPercentage90 = calculatePricePercentage(data, highAlert90, false);
  const highPercentage80 = calculatePricePercentage(data, highAlert80, false);
  const highPercentage70 = calculatePricePercentage(data, highAlert70, false);

  // Encontrar as últimas datas
  const lowLastDate90 = findLastDateForPrice(data, lowAlert90, false);
  const lowLastDate80 = findLastDateForPrice(data, lowAlert80, false);
  const lowLastDate70 = findLastDateForPrice(data, lowAlert70, false);
  const highLastDate90 = findLastDateForPrice(data, highAlert90, true);
  const highLastDate80 = findLastDateForPrice(data, highAlert80, true);
  const highLastDate70 = findLastDateForPrice(data, highAlert70, true);
  const result: AlertSuggestions = {
    lowAlert90: {
      price: lowAlert90,
      percentage: lowPercentage90,
      lastDate: lowLastDate90.date,
      daysSince: lowLastDate90.daysSince,
    },
    lowAlert80: {
      price: lowAlert80,
      percentage: lowPercentage80,
      lastDate: lowLastDate80.date,
      daysSince: lowLastDate80.daysSince,
    },
    lowAlert70: {
      price: lowAlert70,
      percentage: lowPercentage70,
      lastDate: lowLastDate70.date,
      daysSince: lowLastDate70.daysSince,
    },
    highAlert90: {
      price: highAlert90,
      percentage: highPercentage90,
      lastDate: highLastDate90.date,
      daysSince: highLastDate90.daysSince,
    },
    highAlert80: {
      price: highAlert80,
      percentage: highPercentage80,
      lastDate: highLastDate80.date,
      daysSince: highLastDate80.daysSince,
    },
    highAlert70: {
      price: highAlert70,
      percentage: highPercentage70,
      lastDate: highLastDate70.date,
      daysSince: highLastDate70.daysSince,
    },
  };
  
  return result;
};
