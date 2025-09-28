import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const VisualizationContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
});

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});

export const ErrorContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});

export const EmptyResultsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});
