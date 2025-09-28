import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const EmpresasContainer = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "600px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 500,
  color: theme.palette.primary.main,
}));

export const ControlsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  background:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.02)",
  borderRadius: theme.shape.borderRadius,
}));

export const VisualizationWrapper = styled(Box)(({ theme }) => ({
  height: "1000px",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.02)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    "&:hover": {
      background:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)",
    },
  },
}));
