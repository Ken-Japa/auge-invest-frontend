import { MetricasCalculadas } from "../../../../types";
import { SaveReportOptions } from "../../index";
import { METRIC_DESCRIPTIONS, METRIC_FORMULAS } from "../constants";
import { formatNumber, hasValue } from "../helpers";
import { MetricItem, MetricName } from "../types";

export const generateMultiples = (
  metricsResults: MetricasCalculadas | undefined,
  options: SaveReportOptions
): string => {
  const multiplos: MetricItem[] = [
    {
      name: "P/L",
      value: metricsResults?.precoLucro,
      key: "precoLucro" as MetricName,
    },
    {
      name: "EV/EBITDA",
      value: metricsResults?.evEbitda,
      key: "evEbitda" as MetricName,
    },
    {
      name: "EV/Receita",
      value: metricsResults?.evReceita,
      key: "evReceita" as MetricName,
    },
    {
      name: "P/VP",
      value: metricsResults?.precoValorPatrimonial,
      key: "precoValorPatrimonial" as MetricName,
    },
  ].filter((metric) => hasValue(metric.value));

  if (multiplos.length === 0) return "";

  let section = `### Múltiplos\n\n`;
  multiplos.forEach((metric) => {
    const value = formatNumber(metric.value);
    section += `- ${metric.name}: ${value.toFixed(2)}x\n`;
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
