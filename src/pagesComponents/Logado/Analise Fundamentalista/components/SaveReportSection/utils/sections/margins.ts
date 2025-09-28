import { MetricasCalculadas } from "../../../../types";
import { SaveReportOptions } from "../../index";
import { METRIC_DESCRIPTIONS, METRIC_FORMULAS } from "../constants";
import { formatNumber, formatPercentage,hasValue } from "../helpers";
import { MetricItem, MetricName } from "../types";

export const generateMargins = (
  metricsResults: MetricasCalculadas | undefined,
  options: SaveReportOptions
): string => {
  const margens: MetricItem[] = [
    {
      name: "Margem Bruta",
      value: metricsResults?.margemBruta,
      key: "margemBruta" as MetricName,
    },
    {
      name: "Margem Operacional",
      value: metricsResults?.margemOperacional,
      key: "margemOperacional" as MetricName,
    },
    {
      name: "Margem Líquida",
      value: metricsResults?.margemLiquida,
      key: "margemLiquida" as MetricName,
    },
  ].filter((metric) => hasValue(metric.value));

  if (margens.length === 0) return "";

  let section = `### Margens\n\n`;
  margens.forEach((metric) => {
    const value = formatNumber(metric.value);
    section += `- ${metric.name}: ${formatPercentage(value)}\n\n`;
    if (
      options.showDescriptions &&
      metric.key &&
      METRIC_DESCRIPTIONS[metric.key]
    ) {
      section += `  > ${METRIC_DESCRIPTIONS[metric.key]}\n`;
    }
    if (options.showFormulas && metric.key && METRIC_FORMULAS[metric.key]) {
      section += `  Formula: ${METRIC_FORMULAS[metric.key]}\n\n`;
    }
  });

  return section + "\n\n";
};
