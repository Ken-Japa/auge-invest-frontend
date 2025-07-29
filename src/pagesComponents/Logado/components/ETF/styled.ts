import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

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
