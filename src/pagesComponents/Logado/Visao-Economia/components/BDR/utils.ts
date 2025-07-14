import { ViewMode } from "./types";
import { VisualizationMode } from "../../../components/BDR/types";

// Mapeamento de ViewMode para VisualizationMode
export const viewModeToVisualizationMode = (
  viewMode: ViewMode
): VisualizationMode => {
  switch (viewMode) {
    case "cartao":
      return "card";
    case "tabela":
      return "table";
    default:
      return "card";
  }
};

// Mapeamento de VisualizationMode para ViewMode
export const visualizationModeToViewMode = (
  mode: VisualizationMode
): ViewMode => {
  switch (mode) {
    case "card":
      return "cartao";
    case "table":
      return "tabela";
    case "grid":
      return "grid";
    default:
      return "cartao";
  }
};
