// Importação de tipos externos
import { PriceDataPoint as HistoricalPriceDataPoint } from "../../GraficoHistorico/services/historicalService";

// Redefinição de tipos importados para centralização
export interface PriceDataPoint extends HistoricalPriceDataPoint {
  showLabel?: boolean;
}

// Tipos para componentes de análise de preços
export interface AnalisePrecoProps {
  codigoAtivo: string;
}

// Tipos para dados estatísticos
export interface StatisticalData {
  mean: number;
  stdDev: number;
  min: number;
  max: number;
  histogramData: Array<{
    price: number;
    frequency: number;
    normalValue: number;
  }>;
}

// Tipos para períodos de análise
export type AnalysisPeriod = "all" | "5y" | "2.5y" | "custom";

// Tipos para dados de cada período
export interface PeriodData {
  label: string;
  period: AnalysisPeriod;
  data: PriceDataPoint[];
  stats: StatisticalData | null;
}

// Tipos para linhas de desvio padrão
export interface StdDevLine {
  label: string;
  value: number;
}

// Tipos para áreas de heatmap
export interface HeatmapArea {
  label: string;
  start: number;
  end: number;
  opacity: number;
}

// Tipos para sugestões de alertas
export interface AlertSuggestion {
  lowAlert: number;
  highAlert: number;
}

// Tipos para alertas detalhados
export interface DetailedAlert {
  price: number;
  percentage: number;
  lastDate: Date | null;
  daysSince: number | null;
}

// Tipos para sugestões de alertas detalhados
export interface AlertSuggestions {
  lowAlert90: DetailedAlert;
  lowAlert80: DetailedAlert;
  lowAlert70: DetailedAlert;
  highAlert90: DetailedAlert;
  highAlert80: DetailedAlert;
  highAlert70: DetailedAlert;
}

// Tipos para marcadores de gráfico
export interface ChartMarker {
  axis: 'x' | 'y';
  value: number | string;
  lineStyle: { stroke: string; strokeWidth: number; strokeDasharray?: string };
  legend: string;
  legendPosition: 'top' | 'bottom' | 'left' | 'right';
  legendOrientation?: 'horizontal' | 'vertical';
  textStyle: { fill: string };
}

// Tipos para pontos de dados em gráficos
export interface ChartDataPoint {
  x: string;
  y: number;
  showLabel?: boolean;
  originalData: PriceDataPoint;
}
