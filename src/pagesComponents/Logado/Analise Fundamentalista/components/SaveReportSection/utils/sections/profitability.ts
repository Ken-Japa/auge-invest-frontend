import { MetricasCalculadas } from "../../../../types";
import { SaveReportOptions } from "../../index";
import { METRIC_DESCRIPTIONS, METRIC_FORMULAS } from "../constants";
import { formatNumber, formatPercentage,hasValue } from "../helpers";
import { MetricItem, MetricName } from "../types";

export const generateProfitability = (
  metricsResults: MetricasCalculadas | undefined,
  options: SaveReportOptions
): string => {
  const rentabilidade: MetricItem[] = [
    { name: "ROE", value: metricsResults?.roe, key: "roe" as MetricName },
    { name: "ROIC", value: metricsResults?.roic, key: "roic" as MetricName },
    {
      name: "Dividend Yield",
      value: metricsResults?.dividendYield,
      key: "dividendYield" as MetricName,
    },
    {
      name: "Índice de Distribuição",
      value: metricsResults?.payoutRatio,
      key: "payoutRatio" as MetricName,
    },
  ].filter((metric) => hasValue(metric.value));

  if (rentabilidade.length === 0) return "";

  let section = `### Indicadores de Rentabilidade\n\n`;
  rentabilidade.forEach((metric) => {
    const value = formatNumber(metric.value);
    section += `- ${metric.name}: ${formatPercentage(value)}\n`;
    if (
      options.showDescriptions &&
      metric.key &&
      METRIC_DESCRIPTIONS[metric.key]
    ) {
      section += `  > ${METRIC_DESCRIPTIONS[metric.key]}\n\n`;
    }
    if (options.showFormulas && metric.key && METRIC_FORMULAS[metric.key]) {
      section += `  Formula: ${METRIC_FORMULAS[metric.key]}\n`;
    }
  });

  return section + "\n\n";
};
