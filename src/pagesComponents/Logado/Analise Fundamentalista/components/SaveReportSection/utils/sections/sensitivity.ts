import { SensitivityResults } from "../../../ValuationSection/types";
import { formatCurrency, formatPercentage,hasValue } from "../helpers";

export const generateSensitivity = (
  sensitivityResults: SensitivityResults | null
): string => {
  if (!sensitivityResults?.otimista || !sensitivityResults?.pessimista)
    return "";

  let section = `\n\n## Análise de Sensibilidade\n\n`;

  if (hasValue(sensitivityResults.otimista.precoJusto)) {
    section += `### Cenário Otimista\n\n`;
    section += `- Preço Justo: ${formatCurrency(
      sensitivityResults.otimista.precoJusto
    )}\n\n`;
    section += `- Enterprise Value: ${formatCurrency(
      sensitivityResults.otimista.enterpriseValue
    )}\n`;
    section += `- Equity Value: ${formatCurrency(
      sensitivityResults.otimista.equityValue
    )}\n`;
    section += `- Subvalorização: ${formatPercentage(
      sensitivityResults.otimista.subvalorizacao
    )}\n`;
  }

  if (hasValue(sensitivityResults.pessimista.precoJusto)) {
    section += `\n\n### Cenário Pessimista\n`;
    section += `- Preço Justo: ${formatCurrency(
      sensitivityResults.pessimista.precoJusto
    )}\n`;
    section += `- Enterprise Value: ${formatCurrency(
      sensitivityResults.pessimista.enterpriseValue
    )}\n`;
    section += `- Equity Value: ${formatCurrency(
      sensitivityResults.pessimista.equityValue
    )}\n`;
    section += `- Subvalorização: ${formatPercentage(
      sensitivityResults.pessimista.subvalorizacao
    )}\n`;
  }

  return section + "\n\n";
};
