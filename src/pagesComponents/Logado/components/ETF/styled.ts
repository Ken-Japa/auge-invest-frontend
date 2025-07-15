import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const ETFTabsContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
}));

export const BoxVizualizationControl = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));
