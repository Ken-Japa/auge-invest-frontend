import { useState, useEffect, useMemo } from "react";
import {
  fetchHistoricalData,
  preparePeriodData,
  calculateAlertSuggestions,
} from "../services/analiseService";
import { PriceDataPoint, AnalysisPeriod, PeriodData } from "../utils/types";

/**
 * Hook para gerenciar a análise de preços de um ativo
 * @param codigoAtivo Código do ativo a ser analisado
 * @returns Objeto com dados e funções para análise de preços
 */
export const useAnalisePrecos = (codigoAtivo: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<PriceDataPoint[]>([]);
  const [periodData, setPeriodData] = useState<PeriodData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod>("5y");
  const [customYears, setCustomYears] = useState<number>(1);

  // Buscar dados históricos ao carregar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchHistoricalData(codigoAtivo);
        setHistoricalData(data);

        // Preparar dados para cada período
        const periods = preparePeriodData(data, customYears);
        setPeriodData(periods);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dados");
        setLoading(false);
      }
    };

    loadData();
  }, [codigoAtivo]);

  // Atualizar dados quando o período personalizado mudar
  useEffect(() => {
    if (historicalData.length > 0) {
      const periods = preparePeriodData(historicalData, customYears);
      setPeriodData(periods);
    }
  }, [customYears, historicalData]);

  // Obter dados do período selecionado
  const selectedPeriodData = useMemo(() => {
    return (
      periodData.find((period) => period.period === selectedPeriod) || null
    );
  }, [periodData, selectedPeriod]);

  // Obter estatísticas do período selecionado
  const selectedStats = useMemo(() => {
    return selectedPeriodData?.stats || null;
  }, [selectedPeriodData]);

  // Calcular sugestões de alertas
  const alertSuggestions = useMemo(() => {
    if (!selectedStats || !selectedPeriodData) return null;

    const { mean, stdDev } = selectedStats;
    return calculateAlertSuggestions(mean, stdDev, selectedPeriodData.data);
  }, [selectedStats, selectedPeriodData]);

  // Obter sugestões de alertas de compra e venda
  const { lowAlertPrice, highAlertPrice } = useMemo(() => {
    if (!alertSuggestions) {
      return { lowAlertPrice: 0, highAlertPrice: 0 };
    }

    // Usar o alerta de 80% como padrão
    return {
      lowAlertPrice: alertSuggestions.lowAlert80.price,
      highAlertPrice: alertSuggestions.highAlert80.price,
    };
  }, [alertSuggestions]);

  // Função para alterar o período selecionado
  const handlePeriodChange = (period: AnalysisPeriod) => {
    setSelectedPeriod(period);
  };

  // Função para alterar o período personalizado
  const handleCustomYearsChange = (years: number) => {
    setCustomYears(years);
  };

  return {
    loading,
    error,
    historicalData,
    periodData,
    selectedPeriod,
    selectedPeriodData,
    selectedStats,
    customYears,
    alertSuggestions,
    lowAlertPrice,
    highAlertPrice,
    handlePeriodChange,
    handleCustomYearsChange,
  };
};
