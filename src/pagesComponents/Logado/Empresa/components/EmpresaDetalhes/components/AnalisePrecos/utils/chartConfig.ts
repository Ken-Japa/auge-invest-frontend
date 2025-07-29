import { useTheme } from "@mui/material";
import { StdDevLine } from "./types";

/**
 * Gera configurações para linhas de desvio padrão no gráfico
 * @param mean Média dos preços
 * @param stdDev Desvio padrão dos preços
 * @returns Array de linhas de desvio padrão configuradas
 */
export const generateStdDevLines = (
  mean: number,
  stdDev: number
): StdDevLine[] => {
  return [
    { label: "-3σ", value: mean - 3 * stdDev },
    { label: "-2σ", value: mean - 2 * stdDev },
    { label: "-1σ", value: mean - 1 * stdDev },
    { label: "Média", value: mean },
    { label: "+1σ", value: mean + 1 * stdDev },
    { label: "+2σ", value: mean + 2 * stdDev },
    { label: "+3σ", value: mean + 3 * stdDev },
  ];
};

/**
 * Hook para obter configurações de cores e estilos para gráficos
 * @returns Objeto com configurações de cores e estilos
 */
export const useChartStyles = () => {
  const theme = useTheme();

  return {
    colors: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      error: theme.palette.error.main,
      success: theme.palette.success.main,
      info: theme.palette.info.main,
      warning: theme.palette.warning.main,
      text: theme.palette.text.primary,
      background: theme.palette.background.paper,
    },
    tooltip: {
      background: "rgba(255, 255, 255, 0.95)",
      padding: theme.spacing(1.5),
      borderRadius: theme.shape.borderRadius,
      boxShadow: "0 0 10px rgba(0,0,0,0.25)",
      border: "1px solid rgba(0,0,0,0.1)",
    },
    markers: {
      strokeWidth: 2,
      dashArray: "3 3",
      solidLine: "3 0",
    },
  };
};

/**
 * Configura marcadores para alertas no gráfico
 * @param alertaCompra Valor do alerta de compra
 * @param alertaVenda Valor do alerta de venda
 * @param colors Objeto com as cores a serem utilizadas
 * @returns Array de configurações de marcadores
 */
export const configureAlertMarkers = (
  alertaCompra: number | null,
  alertaVenda: number | null,
  colors: { success: string; error: string }
) => {
  const markers = [];

  if (alertaCompra !== null) {
    markers.push({
      axis: "y" as const,
      value: alertaCompra,
      lineStyle: { stroke: colors.success, strokeWidth: 2 },
      legend: `Alerta Compra R$ ${alertaCompra.toFixed(2)}`,
      legendPosition: "top" as const,
      legendOrientation: "horizontal" as const,
      textStyle: { fill: colors.success },
    });
  }

  if (alertaVenda !== null) {
    markers.push({
      axis: "y" as const,
      value: alertaVenda,
      lineStyle: { stroke: colors.error, strokeWidth: 2 },
      legend: `Alerta Venda R$ ${alertaVenda.toFixed(2)}`,
      legendPosition: "top" as const,
      legendOrientation: "horizontal" as const,
      textStyle: { fill: colors.error },
    });
  }

  return markers;
};
