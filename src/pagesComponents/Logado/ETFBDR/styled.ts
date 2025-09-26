import { styled } from "@mui/system";
import { Box, Typography, Paper } from "@mui/material";

export const ETFBDRTabsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
}));

export const ETFTabsContainer = styled(Paper)(({ theme }) => ({
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
