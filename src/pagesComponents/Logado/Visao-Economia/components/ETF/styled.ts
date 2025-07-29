import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const BdrContainer = styled(Box)({
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
  paddingLeft: "8px",
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

export const ContentPlaceholder = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  fontStyle: "italic",
  background:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.02)"
      : "rgba(0, 0, 0, 0.01)",
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
export const ContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(4),
  textAlign: "center",
  alignItems: "center",
}));
