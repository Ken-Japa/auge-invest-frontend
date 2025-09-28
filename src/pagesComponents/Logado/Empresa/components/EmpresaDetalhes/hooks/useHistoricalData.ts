import { useEffect,useState } from "react";

import { EmpresaDetalhada } from "../../../types";
import { getHistoricalData, PriceDataPoint as GraficoPriceDataPoint } from "../components/GraficoHistorico/services/historicalService";
import {
  calculateAllMetrics,
  PriceDataPoint,
} from "../utils/metricasCalculations";

interface Metricas {
  minimo52: number;
  maximo52: number;
  dividendYield: number;
  valorizacao12m: number;
}

interface UseHistoricalDataResult {
  historicalData: PriceDataPoint[];
  graficoData: GraficoPriceDataPoint[];
  metricas: Metricas;
  loading: boolean;
  error: string | null;
}

export const useHistoricalData = (
  empresa: EmpresaDetalhada | null,
  codigoAtivo: string | null
): UseHistoricalDataResult => {
  const [historicalData, setHistoricalData] = useState<PriceDataPoint[]>([]);
  const [graficoData, setGraficoData] = useState<GraficoPriceDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metricas, setMetricas] = useState<Metricas>({
    minimo52: 0,
    maximo52: 0,
    dividendYield: 0,
    valorizacao12m: 0,
  });

  // Fetch historical data and calculate metrics when empresa or codigoAtivo changes
  useEffect(() => {
    const fetchHistoricalDataAndCalculateMetrics = async () => {
      if (!empresa || !codigoAtivo) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch historical data for the active code
        const data = await getHistoricalData(codigoAtivo);
        setGraficoData(data);
        
        // Convert to the format expected by metricasCalculations
        const convertedData: PriceDataPoint[] = data.map(item => ({
          data: item.data,
          valor: item.valor
        }));
        setHistoricalData(convertedData);

        // Calculate annual dividends (sum of all dividends in the last 12 months)
        let annualDividends = 0;

        try {
          if (empresa.dividendos && Array.isArray(empresa.dividendos)) {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            annualDividends = empresa.dividendos
              .filter((div) => {
                if (!div) return false;

                // Handle different possible data structures using type assertion
                const dividend = div as any;
                let divDate;

                try {
                  if (dividend.data && typeof dividend.data === "string") {
                    divDate = new Date(dividend.data);
                  } else if (
                    dividend.date &&
                    typeof dividend.date === "string"
                  ) {
                    divDate = new Date(dividend.date);
                  } else {
                    return false;
                  }

                  return !isNaN(divDate.getTime()) && divDate >= oneYearAgo;
                } catch (e) {
                  console.error("Error parsing dividend date:", e, div);
                  return false;
                }
              })
              .reduce((sum, div) => {
                // Handle different value property names using type assertion
                const dividend = div as any;
                let divValue = 0;

                if (
                  dividend.valor !== undefined &&
                  typeof dividend.valor === "number"
                ) {
                  divValue = dividend.valor;
                } else if (
                  dividend.value !== undefined &&
                  typeof dividend.value === "number"
                ) {
                  divValue = dividend.value;
                } else if (
                  dividend.amount !== undefined &&
                  typeof dividend.amount === "number"
                ) {
                  divValue = dividend.amount;
                }

                return sum + divValue;
              }, 0);
          }
        } catch (e) {
          console.error("Error calculating annual dividends:", e);
        }

        // Calculate all metrics
        const metrics = calculateAllMetrics(data, annualDividends);

        // Update state
        setMetricas(metrics);
      } catch (err) {
        console.error("Erro ao carregar dados históricos:", err);
        setError("Falha ao carregar dados históricos");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalDataAndCalculateMetrics();
  }, [empresa, codigoAtivo]);

  return { historicalData, graficoData, metricas, loading, error };
};
