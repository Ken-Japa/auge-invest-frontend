import {
  generateAdditionalInputs,
  generateBasicInfo,
  generateDebt,
  generateMargins,
  generateMultiples,
  generateOperationalMetrics,
  generateProfitability,
  generateSensitivity,
  generateValuation,
} from "./sections";
import { GenerateReportParams } from "./types";

export const generateReport = ({
  options,
  fundamentalData,
  valuationResults,
  sensitivityResults,
  metricsResults,
}: GenerateReportParams): string => {
  let report = `# ${options.companyName}\n\n`;

  report += generateBasicInfo(fundamentalData);
  report += `## Métricas Financeiras\n\n`;
  report += generateOperationalMetrics(fundamentalData);
  report += generateAdditionalInputs(fundamentalData);
  report += generateMargins(metricsResults, options);
  report += generateProfitability(metricsResults, options);
  report += generateDebt(fundamentalData, options);
  report += generateMultiples(metricsResults, options);
  report += generateValuation(valuationResults, options);
  report += generateSensitivity(sensitivityResults);

  return report;
};
