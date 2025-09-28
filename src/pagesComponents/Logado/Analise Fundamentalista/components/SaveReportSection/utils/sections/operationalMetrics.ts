import { DadosAnaliseFundamental } from "../../../../types";
import { formatCurrency,formatNumber, hasValue } from "../helpers";
import { MetricItem } from "../types";

export const generateOperationalMetrics = (
  fundamentalData: DadosAnaliseFundamental
): string => {
  let section = `### Dados Operacionais\n\n`;

  // Calculate Enterprise Value if possible
  if (
    hasValue(fundamentalData.precoAcao) &&
    hasValue(fundamentalData.acoesCirculacao) &&
    hasValue(fundamentalData.dividaLiquida)
  ) {
    const valorMercado =
      fundamentalData.precoAcao * fundamentalData.acoesCirculacao;
    const enterpriseValue = valorMercado + fundamentalData.dividaLiquida * 1000;
    section += `- Valor da Empresa (EV): ${formatCurrency(enterpriseValue)}\n`;
  }

  const operationalMetrics: MetricItem[] = [
    {
      name: "Receita Líquida",
      value: fundamentalData.receitaLiquida
        ? fundamentalData.receitaLiquida * 1000
        : undefined,
      isCurrency: true,
    },
    {
      name: "EBITDA",
      value: fundamentalData.ebitda ? fundamentalData.ebitda * 1000 : undefined,
      isCurrency: true,
    },
    {
      name: "EBIT",
      value: fundamentalData.ebit ? fundamentalData.ebit * 1000 : undefined,
      isCurrency: true,
    },
    {
      name: "Lucro Líquido",
      value: fundamentalData.lucroLiquido
        ? fundamentalData.lucroLiquido * 1000
        : undefined,
      isCurrency: true,
    },
    {
      name: "Patrimônio Líquido",
      value: fundamentalData.patrimonioLiquido
        ? fundamentalData.patrimonioLiquido * 1000
        : undefined,
      isCurrency: true,
    },
    {
      name: "Caixa e Equivalentes",
      value: fundamentalData.caixaEquivalentes
        ? fundamentalData.caixaEquivalentes * 1000
        : undefined,
      isCurrency: true,
    },
  ].filter((metric) => hasValue(metric.value));

  if (operationalMetrics.length === 0) return "";

  operationalMetrics.forEach((metric) => {
    const value = formatNumber(metric.value);
    section += `- ${metric.name}: ${formatCurrency(value)}\n\n`;
  });

  return section + "\n\n";
};
