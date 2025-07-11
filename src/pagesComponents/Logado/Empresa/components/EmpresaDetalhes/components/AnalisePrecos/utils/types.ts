import { PriceDataPoint } from "../../GraficoHistorico/services/historicalService";
import {
  StatisticalData,
  AnalysisPeriod,
  PeriodData,
} from "../services/analiseService";

export interface AnalisePrecoProps {
  codigoAtivo: string;
}

export interface StdDevLine {
  label: string;
  value: number;
}

export interface HeatmapArea {
  label: string;
  start: number;
  end: number;
  opacity: number;
}

export interface AlertSuggestion {
  lowAlert: number;
  highAlert: number;
}

export type { PriceDataPoint, StatisticalData, AnalysisPeriod, PeriodData };
