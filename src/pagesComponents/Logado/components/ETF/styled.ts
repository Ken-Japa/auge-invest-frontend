import { Box, Paper,Typography } from "@mui/material";
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

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(3),
  color:
    theme.palette.mode === "dark"
      ? theme.palette.text.secondary
      : theme.palette.text.secondary,
}));

export const VIzualizerContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(19, 47, 76, 0.85)"
      : "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  boxShadow: "12px",
}));
