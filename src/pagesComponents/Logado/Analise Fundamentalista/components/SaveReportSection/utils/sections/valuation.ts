import { ValuationResults } from "../../../ValuationSection/types";
import { SaveReportOptions } from "../../index";
import { formatCurrency, formatPercentage,hasValue } from "../helpers";

// Change from generateValuationSection to generateValuation to match the import
export const generateValuation = (
  valuationResults: ValuationResults | null,
  options: SaveReportOptions
): string => {
  if (!valuationResults) return "";

  let section = `\n\n## Resultados da Avaliação\n\n`;
  section += `- Preço Justo: ${formatCurrency(
    valuationResults.precoJusto
  )}\n\n`;
  section += `- Enterprise Value (EV): ${formatCurrency(
    valuationResults.enterpriseValue
  )}\n`;
  section += `- Equity Value: ${formatCurrency(
    valuationResults.equityValue
  )}\n`;

  if (hasValue(valuationResults.subvalorizacao)) {
    section += `- Subvalorização: ${formatPercentage(
      valuationResults.subvalorizacao
    )}\n`;
  }

  if (options.showCalculations) {
    section += `\n### Detalhes dos Cálculos\n`;
    if (hasValue(valuationResults.taxaProjecaoUtilizada)) {
      section += `- Taxa de Crescimento Projetada: ${formatPercentage(
        valuationResults.taxaProjecaoUtilizada
      )}\n`;
    }
    if (hasValue(valuationResults.crescimentoTerminalUtilizado)) {
      section += `- Crescimento Terminal: ${formatPercentage(
        valuationResults.crescimentoTerminalUtilizado
      )}\n`;
    }
    if (hasValue(valuationResults.detalhes.waccUtilizado)) {
      section += `- WACC Utilizado: ${formatPercentage(
        valuationResults.detalhes.waccUtilizado
      )}\n`;
    }
    if (valuationResults.detalhes.fluxosCaixa.length > 0) {
      section += `- Fluxos de Caixa Projetados:\n`;
      valuationResults.detalhes.fluxosCaixa
        .filter((fcf) => hasValue(fcf))
        .forEach((fcf, index) => {
          section += `  Ano ${index + 1}: ${formatCurrency(fcf)}\n`;
        });
    }
  }

  return section + "\n\n";
};
